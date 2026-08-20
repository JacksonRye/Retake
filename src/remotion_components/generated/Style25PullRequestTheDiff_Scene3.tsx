import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style25PullRequestTheDiff_Scene3() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1 (0.0s – 1.0s): FILE ENTRANCE
	// ==========================================
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const tabPop = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const lineNumberLock = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	// ==========================================
	// BEAT 2 (1.0s – 2.8s): DIFF SCROLL + STALL
	// ==========================================
	const scrollProgress = spring({
		frame: frame - 24,
		fps,
		config: {damping: 16, stiffness: 140, mass: 0.9},
	});

	const scrollOffset = interpolate(scrollProgress, [0, 1], [0, 292], clamp);

	const additionsFade = interpolate(frame, [28, 52, 72], [1, 1, 0.16], clamp);
	const additionsScale = interpolate(frame, [28, 70], [1, 0.985], clamp);

	const anchorReveal = interpolate(frame, [52, 74], [0, 1], clamp);
	const anchorStamp = spring({
		frame: frame - 60,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const mergeSurge = interpolate(frame, [42, 58, 70], [0.08, 0.66, 0.66], clamp);
	const mergeGrayFlash = interpolate(frame, [58, 74], [0.28, 1], clamp);

	// ==========================================
	// BEAT 3 (2.8s – 4.5s): IDLE BREATH + SHIMMER + EXIT
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 7;
	const hoverTilt = Math.sin(frame * 0.08) * 1.2;
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [18, 28]);

	const unchangedBreath = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.994, 1.008]);
	const scrollbarDrift = Math.sin(frame * 0.06) * 6;
	const caretBlink = frame % 24 < 12 ? 1 : 0;

	const shimmerTravel = interpolate(frame, [84, 108], [-180, 460], clamp);
	const shimmerOpacity = interpolate(frame, [84, 92, 108], [0, 0.35, 0], clamp);

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.8},
	});

	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

	const containerOpacity =
		interpolate(entrance, [0, 0.18], [0, 1], clamp) * exitOpacity;
	const containerScale =
		interpolate(entrance, [0, 1], [0.86, 1], clamp) * exitScale;

	const fileLines = [
		{n: 18, type: 'add', text: '+ viral post'},
		{n: 19, type: 'add', text: '+ texts'},
		{n: 20, type: 'add', text: '+ attention'},
		{n: 21, type: 'context', text: ' '},
		{n: 22, type: 'same', text: '= nothing really changed'},
		{n: 23, type: 'context', text: ''},
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0D1117',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily:
					'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at 50% 30%, rgba(121,192,255,0.08), transparent 42%)',
				}}
			/>

			<div
				style={{
					width: '92%',
					minHeight: 580,
					opacity: containerOpacity,
					transform: `scale(${containerScale}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					backgroundColor: '#0D1117',
					border: '3px solid #8B949E',
					borderRadius: 30,
					boxShadow: `0px ${shadowPulse}px 0px rgba(0,0,0,0.65)`,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				{/* Tab / top chrome */}
				<div
					style={{
						backgroundColor: '#0F1620',
						borderBottom: '2px solid #8B949E',
						padding: '18px 22px 0 22px',
						display: 'flex',
						flexDirection: 'column',
						gap: 14,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'space-between',
							gap: 16,
						}}
					>
						<div
							style={{
								transform: `scale(${tabPop})`,
								transformOrigin: 'left bottom',
								backgroundColor: '#161B22',
								border: '2px solid #8B949E',
								borderBottom: '0px solid transparent',
								borderTopLeftRadius: 16,
								borderTopRightRadius: 16,
								padding: '14px 18px 16px 18px',
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								minWidth: 0,
							}}
						>
							<div
								style={{
									width: 14,
									height: 14,
									borderRadius: 999,
									backgroundColor: '#79C0FF',
									flexShrink: 0,
								}}
							/>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
									fontSize: 24,
									fontWeight: 800,
									color: '#F0F6FC',
									letterSpacing: '-0.02em',
									whiteSpace: 'nowrap',
								}}
							>
								aftermath.md
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								paddingBottom: 12,
								flexShrink: 0,
							}}
						>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
									fontSize: 18,
									fontWeight: 800,
									color: '#8B949E',
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
								}}
							>
								#pr-25
							</div>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
									fontSize: 18,
									fontWeight: 800,
									color: '#79C0FF',
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
								}}
							>
								@aftermath
							</div>
						</div>
					</div>

					<div
						style={{
							backgroundColor: '#161B22',
							border: '2px solid #30363D',
							borderRadius: 16,
							padding: '14px 16px',
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
							marginBottom: 18,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 16,
							}}
						>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
									fontSize: 18,
									fontWeight: 800,
									color: '#8B949E',
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
								}}
							>
								merge follow-through
							</div>

							<div
								style={{
									fontSize: 20,
									fontWeight: 900,
									color: '#8B949E',
									minWidth: 58,
									textAlign: 'right',
								}}
							>
								{Math.round(mergeSurge * 100)}%
							</div>
						</div>

						<div
							style={{
								height: 18,
								borderRadius: 999,
								backgroundColor: '#0D1117',
								border: '2px solid #30363D',
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									height: '100%',
									width: `${mergeSurge * 100}%`,
									borderRadius: 999,
									backgroundColor:
										frame < 66
											? '#2EA043'
											: `rgba(139,148,158,${0.72 + 0.28 * mergeGrayFlash})`,
									transition: 'none',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: shimmerTravel,
									width: 150,
									height: '100%',
									background:
										'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
									opacity: shimmerOpacity,
								}}
							/>
						</div>
					</div>
				</div>

				{/* Diff body */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						padding: '24px 22px 26px 22px',
						gap: 18,
						position: 'relative',
					}}
				>
					{/* Line numbers */}
					<div
						style={{
							width: 74,
							flexShrink: 0,
							backgroundColor: '#11161D',
							border: '2px solid #30363D',
							borderRadius: 18,
							padding: '20px 12px',
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						{fileLines.map((line, i) => {
							const isAboveAnchor = i < 4;
							const localY = isAboveAnchor
								? -scrollOffset
								: interpolate(anchorReveal, [0, 1], [28, 0], clamp);

							const localOpacity = isAboveAnchor
								? additionsFade
								: interpolate(anchorReveal, [0, 1], [0.4, 1], clamp);

							return (
								<div
									key={line.n}
									style={{
										height: 46,
										transform: `translateY(${localY}px) scale(${lineNumberLock})`,
										opacity: localOpacity,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
										fontSize: 22,
										fontWeight: 700,
										color: '#8B949E',
										lineHeight: 1,
										whiteSpace: 'nowrap',
									}}
								>
									{line.n}
								</div>
							);
						})}
					</div>

					{/* Code panel */}
					<div
						style={{
							flex: 1,
							backgroundColor: '#161B22',
							border: '2px solid #30363D',
							borderRadius: 18,
							padding: '20px 22px',
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{fileLines.map((line, i) => {
							const isAboveAnchor = i < 4;
							const isAnchor = line.type === 'same';
							const isEmptyBelow = line.n === 23;

							const localY = isAboveAnchor
								? -scrollOffset
								: interpolate(anchorReveal, [0, 1], [28, 0], clamp);

							const localOpacity = isAboveAnchor
								? additionsFade
								: interpolate(anchorReveal, [0, 1], [0.35, 1], clamp);

							const rowBg =
								line.type === 'add'
									? 'rgba(46,160,67,0.14)'
									: isAnchor
										? 'rgba(121,192,255,0.07)'
										: 'transparent';

							const rowBorder =
								line.type === 'add'
									? '1px solid rgba(46,160,67,0.30)'
									: isAnchor
										? '1px solid rgba(121,192,255,0.24)'
										: '1px solid transparent';

							const symbolColor =
								line.type === 'add'
									? '#2EA043'
									: isAnchor
										? '#79C0FF'
										: '#8B949E';

							const textColor =
								line.type === 'add'
									? '#C9F7D1'
									: isAnchor
										? '#F0F6FC'
										: '#8B949E';

							return (
								<div
									key={`${line.n}-${line.text}`}
									style={{
										height: 46,
										transform: `translateY(${localY}px) scale(${
											isAnchor ? unchangedBreath : additionsScale
										})`,
										opacity: localOpacity,
										borderRadius: 12,
										backgroundColor: rowBg,
										border: rowBorder,
										display: 'flex',
										alignItems: 'center',
										padding: '0 16px',
										gap: 16,
										position: 'relative',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											width: 20,
											flexShrink: 0,
											fontSize: 26,
											fontWeight: 900,
											color: symbolColor,
											lineHeight: 1,
											textAlign: 'center',
										}}
									>
										{line.type === 'add' ? '+' : line.type === 'same' ? '=' : ''}
									</div>

									<div
										style={{
											flex: 1,
											minWidth: 0,
											fontSize: isAnchor ? 34 : 30,
											fontWeight: isAnchor ? 900 : 700,
											color: textColor,
											lineHeight: 1.05,
											letterSpacing: isAnchor ? '-0.03em' : '-0.01em',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										{line.text || ' '}
									</div>

									{line.type === 'add' && frame > 34 ? (
										<div
											style={{
												fontFamily:
													'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
												fontSize: 16,
												fontWeight: 900,
												color: '#0D1117',
												backgroundColor: '#2EA043',
												border: '2px solid #0D1117',
												borderRadius: 999,
												padding: '6px 10px',
												transform: `scale(${interpolate(
													frame - i * 2,
													[34, 44],
													[0, 1],
													clamp
												)})`,
												flexShrink: 0,
											}}
										>
											✓
										</div>
									) : null}

									{isAnchor ? (
										<div
											style={{
												position: 'absolute',
												right: 12,
												top: 7,
												transform: `scale(${anchorStamp}) rotate(-8deg)`,
												transformOrigin: 'center',
												opacity: interpolate(anchorReveal, [0, 1], [0, 1], clamp),
												backgroundColor: '#8B949E',
												color: '#0D1117',
												border: '2px solid #0D1117',
												borderRadius: 999,
												padding: '6px 12px',
												fontFamily:
													'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
												fontSize: 14,
												fontWeight: 900,
												textTransform: 'uppercase',
												letterSpacing: '0.08em',
											}}
										>
											unchanged
										</div>
									) : null}

									{isEmptyBelow ? (
										<div
											style={{
												width: 3,
												height: 28,
												backgroundColor: '#79C0FF',
												opacity: caretBlink,
												borderRadius: 2,
												marginLeft: 4,
											}}
										/>
									) : null}
								</div>
							);
						})}

						{/* Scroll anchor marker */}
						<div
							style={{
								position: 'absolute',
								right: 18,
								top: 18,
								backgroundColor: '#0D1117',
								border: '2px solid #30363D',
								borderRadius: 999,
								padding: '8px 12px',
								display: 'flex',
								alignItems: 'center',
								gap: 8,
							}}
						>
							<div
								style={{
									width: 10,
									height: 10,
									borderRadius: 999,
									backgroundColor: '#79C0FF',
								}}
							/>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
									fontSize: 14,
									fontWeight: 900,
									color: '#8B949E',
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
								}}
							>
								#line-22
							</div>
						</div>
					</div>

					{/* Scrollbar */}
					<div
						style={{
							width: 18,
							flexShrink: 0,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								width: 10,
								height: '100%',
								borderRadius: 999,
								backgroundColor: '#11161D',
								border: '2px solid #30363D',
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: 1,
									top: 110 + scrollProgress * 180 + scrollbarDrift,
									width: 4,
									height: 132,
									borderRadius: 999,
									backgroundColor: '#8B949E',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}