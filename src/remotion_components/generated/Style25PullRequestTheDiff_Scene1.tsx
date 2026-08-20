import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style25PullRequestTheDiff_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — ENTRANCE
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.65,
		},
	});

	const chromeSlide = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 13,
			stiffness: 210,
			mass: 0.7,
		},
	});

	const hashSlide = spring({
		frame: frame - 6,
		fps,
		config: {
			damping: 14,
			stiffness: 240,
			mass: 0.6,
		},
	});

	// ------------------------------------------
	// BEAT 2 — ACTIVE DIFF TRANSFORMATION
	// ------------------------------------------
	const deletionStrikeProgress = interpolate(frame, [28, 42], [0, 1], clamp);

	const additionReveal1 = interpolate(frame, [42, 52], [0, 1], clamp);
	const additionReveal2 = interpolate(frame, [52, 64], [0, 1], clamp);

	const approveEntrance = spring({
		frame: frame - 52,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.6,
		},
	});

	// ------------------------------------------
	// BEAT 3 — IDLE LIFE + EXIT
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.6;
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [16, 28]);

	const scrollJitter = Math.sin(frame * 0.09) * 6;
	const cursorBlinkGreen = Math.sin(frame * 0.22) > 0 ? 1 : 0.25;
	const cursorBlinkRed = Math.sin(frame * 0.2 + 0.8) > 0 ? 1 : 0.2;

	const lightSweep = interpolate(frame, [78, 102], [-420, 760], clamp);

	const approvePulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [1, 1.035]);

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 12, stiffness: 250, mass: 0.8},
	});

	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
	const exitY = interpolate(exitProgress, [0, 1], [0, -80], clamp);

	const containerOpacity =
		interpolate(entrance, [0, 0.18], [0, 1], clamp) * exitOpacity;
	const containerScale = interpolate(entrance, [0, 1], [0.86, 1], clamp) * exitScale;
	const containerY =
		interpolate(entrance, [0, 1], [220, 0], clamp) + hoverY + exitY;

	const cardWidth = '92%';
	const lineHeight = 56;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0D1117',
				fontFamily:
					'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width: cardWidth,
					minHeight: 1180,
					opacity: containerOpacity,
					transform: `translateY(${containerY}px) scale(${containerScale}) rotate(${hoverTilt}deg)`,
					backgroundColor: '#0D1117',
					border: '4px solid #8B949E',
					borderRadius: 34,
					boxShadow: `0px ${shadowPulse}px 0px rgba(0,0,0,0.85)`,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				{/* Top chrome */}
				<div
					style={{
						height: 94,
						backgroundColor: '#161B22',
						borderBottom: '3px solid #30363D',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '0 28px',
						transform: `translateY(${interpolate(chromeSlide, [0, 1], [-26, 0], clamp)}px)`,
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
						<div style={{display: 'flex', gap: 10}}>
							<div
								style={{
									width: 18,
									height: 18,
									borderRadius: 999,
									backgroundColor: '#F85149',
									border: '2px solid #0D1117',
								}}
							/>
							<div
								style={{
									width: 18,
									height: 18,
									borderRadius: 999,
									backgroundColor: '#79C0FF',
									border: '2px solid #0D1117',
								}}
							/>
							<div
								style={{
									width: 18,
									height: 18,
									borderRadius: 999,
									backgroundColor: '#2EA043',
									border: '2px solid #0D1117',
								}}
							/>
						</div>

						<div
							style={{
								fontFamily:
									'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
								fontSize: 22,
								fontWeight: 800,
								letterSpacing: '-0.02em',
								color: '#79C0FF',
							}}
						>
							Pull Request
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							transform: `translateX(${interpolate(hashSlide, [0, 1], [40, 0], clamp)}px)`,
						}}
					>
						<div
							style={{
								padding: '8px 14px',
								borderRadius: 999,
								border: '2px solid #30363D',
								backgroundColor: '#0D1117',
								fontSize: 18,
								fontWeight: 700,
								color: '#8B949E',
							}}
						>
							#mindset-rewrite
						</div>
						<div
							style={{
								padding: '8px 14px',
								borderRadius: 999,
								border: '2px solid #2EA043',
								backgroundColor: 'rgba(46,160,67,0.14)',
								fontSize: 18,
								fontWeight: 800,
								color: '#2EA043',
							}}
						>
							@layla
						</div>
						<div
							style={{
								padding: '8px 14px',
								borderRadius: 999,
								border: '2px solid #30363D',
								backgroundColor: '#0D1117',
								fontSize: 18,
								fontWeight: 700,
								color: '#79C0FF',
							}}
						>
							9c7f2a1
						</div>
					</div>
				</div>

				{/* Main content */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: '34px 34px 30px 34px',
						gap: 28,
						flex: 1,
						position: 'relative',
					}}
				>
					{/* Header block */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 14,
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 14,
								flexWrap: 'wrap',
							}}
						>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontSize: 64,
									lineHeight: 0.95,
									fontWeight: 900,
									letterSpacing: '-0.05em',
									color: '#E6EDF3',
								}}
							>
								#forbes-list
							</div>

							<div
								style={{
									padding: '10px 18px',
									borderRadius: 999,
									border: '3px solid #2EA043',
									backgroundColor: 'rgba(46,160,67,0.16)',
									fontSize: 22,
									fontWeight: 900,
									color: '#2EA043',
								}}
							>
								OPEN
							</div>
						</div>

						<div
							style={{
								fontSize: 24,
								lineHeight: 1.35,
								color: '#8B949E',
								maxWidth: '100%',
							}}
						>
							rewrite belief model / remove dependency on outside approval
						</div>
					</div>

					{/* Diff panel */}
					<div
						style={{
							flex: 1,
							backgroundColor: '#0B0F14',
							border: '3px solid #30363D',
							borderRadius: 24,
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							position: 'relative',
						}}
					>
						<div
							style={{
								height: 62,
								backgroundColor: '#161B22',
								borderBottom: '2px solid #30363D',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '0 24px',
							}}
						>
							<div
								style={{
									fontSize: 22,
									fontWeight: 800,
									color: '#E6EDF3',
								}}
							>
								diff --beliefs /self-worth.ts
							</div>
							<div
								style={{
									fontSize: 20,
									fontWeight: 700,
									color: '#8B949E',
								}}
							>
								@@ anchor: line_108 @@
							</div>
						</div>

						<div
							style={{
								position: 'relative',
								padding: '22px 0',
								display: 'flex',
								flexDirection: 'column',
								transform: `translateY(${scrollJitter}px)`,
							}}
						>
							{/* Static context lines */}
							{[
								'const target = "real work";',
								'const noise = filter(hype);',
								'if (status === "external") return false;',
							].map((text, i) => (
								<div
									key={text}
									style={{
										height: lineHeight,
										display: 'grid',
										gridTemplateColumns: '84px 1fr',
										alignItems: 'center',
										padding: '0 24px',
										backgroundColor: i % 2 === 0 ? '#0D1117' : '#0F141B',
									}}
								>
									<div
										style={{
											fontSize: 24,
											color: '#6E7681',
											textAlign: 'right',
											paddingRight: 22,
											userSelect: 'none',
										}}
									>
										{108 + i}
									</div>
									<div
										style={{
											fontSize: 28,
											lineHeight: 1.2,
											color: '#8B949E',
											whiteSpace: 'nowrap',
										}}
									>
										{text}
									</div>
								</div>
							))}

							{/* Deletion line */}
							<div
								style={{
									height: lineHeight,
									display: 'grid',
									gridTemplateColumns: '84px 1fr',
									alignItems: 'center',
									padding: '0 24px',
									backgroundColor: 'rgba(248,81,73,0.14)',
									borderTop: '1px solid rgba(248,81,73,0.24)',
									borderBottom: '1px solid rgba(248,81,73,0.24)',
									position: 'relative',
								}}
							>
								<div
									style={{
										fontSize: 24,
										color: '#F85149',
										textAlign: 'right',
										paddingRight: 22,
										userSelect: 'none',
									}}
								>
									111
								</div>
								<div
									style={{
										position: 'relative',
										fontSize: 30,
										lineHeight: 1.2,
										color: '#F85149',
										whiteSpace: 'nowrap',
										fontWeight: 700,
									}}
								>
									<span>- external validation matters</span>
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: '52%',
											height: 5,
											borderRadius: 999,
											backgroundColor: '#F85149',
											width: `${deletionStrikeProgress * 100}%`,
											boxShadow: '0 0 12px rgba(248,81,73,0.55)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											right: -18,
											top: 10,
											width: 10,
											height: 34,
											backgroundColor: '#F85149',
											opacity: cursorBlinkRed,
											borderRadius: 2,
										}}
									/>
								</div>
							</div>

							{/* Addition line 1 */}
							<div
								style={{
									height: lineHeight,
									display: 'grid',
									gridTemplateColumns: '84px 1fr',
									alignItems: 'center',
									padding: '0 24px',
									backgroundColor: 'rgba(46,160,67,0.14)',
									borderTop: '1px solid rgba(46,160,67,0.24)',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										fontSize: 24,
										color: '#2EA043',
										textAlign: 'right',
										paddingRight: 22,
										userSelect: 'none',
									}}
								>
									112
								</div>
								<div
									style={{
										position: 'relative',
										fontSize: 30,
										lineHeight: 1.2,
										color: '#2EA043',
										whiteSpace: 'nowrap',
										fontWeight: 700,
										opacity: interpolate(additionReveal1, [0, 0.12], [0, 1], clamp),
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background:
												'linear-gradient(90deg, rgba(46,160,67,0) 0%, rgba(121,192,255,0.45) 50%, rgba(46,160,67,0) 100%)',
											transform: `translateX(${interpolate(additionReveal1, [0, 1], [-560, 280], clamp)}px)`,
											mixBlendMode: 'screen',
											pointerEvents: 'none',
										}}
									/>
									<div
										style={{
											overflow: 'hidden',
											width: `${additionReveal1 * 100}%`,
										}}
									>
										<span>+ they still move on</span>
									</div>
								</div>
							</div>

							{/* Addition line 2 */}
							<div
								style={{
									height: lineHeight,
									display: 'grid',
									gridTemplateColumns: '84px 1fr',
									alignItems: 'center',
									padding: '0 24px',
									backgroundColor: 'rgba(46,160,67,0.14)',
									borderBottom: '1px solid rgba(46,160,67,0.24)',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										fontSize: 24,
										color: '#2EA043',
										textAlign: 'right',
										paddingRight: 22,
										userSelect: 'none',
									}}
								>
									113
								</div>
								<div
									style={{
										position: 'relative',
										fontSize: 30,
										lineHeight: 1.2,
										color: '#2EA043',
										whiteSpace: 'nowrap',
										fontWeight: 700,
										opacity: interpolate(additionReveal2, [0, 0.12], [0, 1], clamp),
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background:
												'linear-gradient(90deg, rgba(46,160,67,0) 0%, rgba(121,192,255,0.45) 50%, rgba(46,160,67,0) 100%)',
											transform: `translateX(${interpolate(additionReveal2, [0, 1], [-560, 280], clamp)}px)`,
											mixBlendMode: 'screen',
											pointerEvents: 'none',
										}}
									/>
									<div
										style={{
											overflow: 'hidden',
											width: `${additionReveal2 * 100}%`,
										}}
									>
										<span>+ work anyway // no approval required</span>
									</div>
									<div
										style={{
											position: 'absolute',
											right: -18,
											top: 10,
											width: 10,
											height: 34,
											backgroundColor: '#2EA043',
											opacity: cursorBlinkGreen,
											borderRadius: 2,
										}}
									/>
								</div>
							</div>

							{/* More context */}
							{[
								'commit();',
								'push(origin, "main");',
								'return "eventually";',
							].map((text, i) => (
								<div
									key={text}
									style={{
										height: lineHeight,
										display: 'grid',
										gridTemplateColumns: '84px 1fr',
										alignItems: 'center',
										padding: '0 24px',
										backgroundColor: i % 2 === 0 ? '#0D1117' : '#0F141B',
									}}
								>
									<div
										style={{
											fontSize: 24,
											color: '#6E7681',
											textAlign: 'right',
											paddingRight: 22,
											userSelect: 'none',
										}}
									>
										{114 + i}
									</div>
									<div
										style={{
											fontSize: 28,
											lineHeight: 1.2,
											color: '#8B949E',
											whiteSpace: 'nowrap',
										}}
									>
										{text}
									</div>
								</div>
							))}

							{/* Light sweep */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									left: lightSweep,
									width: 220,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(121,192,255,0.08) 45%, rgba(255,255,255,0.18) 50%, rgba(121,192,255,0.08) 55%, rgba(255,255,255,0) 100%)',
									transform: 'skewX(-16deg)',
									pointerEvents: 'none',
								}}
							/>
						</div>
					</div>

					{/* Footer actions */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 20,
							flexWrap: 'wrap',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 16,
								flexWrap: 'wrap',
							}}
						>
							<div
								style={{
									padding: '10px 16px',
									borderRadius: 999,
									border: '2px solid #30363D',
									backgroundColor: '#161B22',
									fontSize: 18,
									fontWeight: 700,
									color: '#8B949E',
								}}
							>
								commit: 9c7f2a1
							</div>
							<div
								style={{
									padding: '10px 16px',
									borderRadius: 999,
									border: '2px solid #30363D',
									backgroundColor: '#161B22',
									fontSize: 18,
									fontWeight: 700,
									color: '#79C0FF',
								}}
							>
								anchor: eventually
							</div>
						</div>

						<div
							style={{
								transform: `scale(${interpolate(approveEntrance, [0, 1], [0.86, 1], clamp) * approvePulse})`,
								opacity: interpolate(approveEntrance, [0, 0.2], [0, 1], clamp),
								padding: '18px 28px',
								borderRadius: 18,
								border: '3px solid #2EA043',
								backgroundColor: 'rgba(46,160,67,0.1)',
								boxShadow: '0px 8px 0px rgba(0,0,0,0.45)',
								display: 'flex',
								alignItems: 'center',
								gap: 14,
							}}
						>
							<div
								style={{
									width: 28,
									height: 28,
									borderRadius: 999,
									border: '3px solid #2EA043',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#2EA043',
									fontSize: 18,
									fontWeight: 900,
								}}
							>
								✓
							</div>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontSize: 28,
									fontWeight: 900,
									color: '#2EA043',
									letterSpacing: '-0.02em',
								}}
							>
								Approve
							</div>
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}