import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style25PullRequestTheDiff_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — Entrance
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 210,
			mass: 0.72,
		},
	});

	const cardTranslateX = interpolate(entrance, [0, 0.72, 1], [620, -22, 0], clamp);
	const cardScale = interpolate(entrance, [0, 1], [0.92, 1], clamp);
	const cardOpacity = interpolate(entrance, [0, 0.18], [0, 1], clamp);

	const sidebarEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 13,
			stiffness: 220,
			mass: 0.65,
		},
	});

	// ------------------------------------------
	// BEAT 2 — Active transformation
	// ------------------------------------------
	const reviewCountRaw = Math.round(interpolate(frame, [24, 78], [0, 40], clamp));
	const reviewCountDisplay =
		frame >= 84 ? 34 + Math.round(((Math.sin(frame * 0.55) + 1) / 2) * 6) : reviewCountRaw;

	const stamp1 = spring({
		frame: frame - 28,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const stamp2 = spring({
		frame: frame - 39,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const stamp3 = spring({
		frame: frame - 50,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const stamp4 = spring({
		frame: frame - 61,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const stampThunk1 = frame >= 28 ? interpolate(frame, [28, 33, 39], [0, 8, 0], clamp) : 0;
	const stampThunk2 = frame >= 39 ? interpolate(frame, [39, 44, 50], [0, 8, 0], clamp) : 0;
	const stampThunk3 = frame >= 50 ? interpolate(frame, [50, 55, 61], [0, 8, 0], clamp) : 0;
	const stampThunk4 = frame >= 61 ? interpolate(frame, [61, 66, 72], [0, 8, 0], clamp) : 0;

	const rowReveal1 = interpolate(frame, [24, 34], [0, 1], clamp);
	const rowReveal2 = interpolate(frame, [35, 45], [0, 1], clamp);
	const rowReveal3 = interpolate(frame, [46, 56], [0, 1], clamp);
	const rowReveal4 = interpolate(frame, [57, 67], [0, 1], clamp);

	const threadScrollY = interpolate(frame, [48, 76], [0, -82], clamp);

	// ------------------------------------------
	// BEAT 3 — Living physics + exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.4;
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [16, 28]);

	const selectionSweep = interpolate(frame, [86, 108], [-420, 420], clamp);
	const selectionOpacity = interpolate(frame, [86, 92, 106, 112], [0, 0.18, 0.18, 0], clamp);

	const pulse1 = 1 + Math.sin(frame * 0.18) * 0.03;
	const pulse2 = 1 + Math.sin(frame * 0.18 + 0.8) * 0.03;
	const pulse3 = 1 + Math.sin(frame * 0.18 + 1.6) * 0.03;
	const pulse4 = 1 + Math.sin(frame * 0.18 + 2.4) * 0.03;

	const exit = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {
			damping: 12,
			stiffness: 240,
			mass: 0.7,
		},
	});

	const exitScale = interpolate(exit, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exit, [0, 1], [1, 0], clamp);

	const containerOpacity = cardOpacity * exitOpacity;
	const containerScale = cardScale * exitScale;

	const mono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';
	const sans =
		'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

	const lineBar = (width: string, color: string, reveal: number) => ({
		width,
		height: 18,
		borderRadius: 6,
		backgroundColor: color,
		opacity: reveal,
		transform: `scaleX(${reveal})`,
		transformOrigin: 'left center' as const,
	});

	const stampStyle = (scale: number, thunk: number, pulse: number, activeColor: string) => ({
		transform: `scale(${Math.max(0, scale) * pulse})`,
		backgroundColor: activeColor,
		border: '3px solid #0D1117',
		borderRadius: 999,
		padding: '6px 14px',
		boxShadow: `0px ${thunk}px 0px #0D1117`,
		color: '#0D1117',
		fontFamily: sans,
		fontWeight: 900,
		fontSize: 18,
		letterSpacing: '0.02em',
		lineHeight: 1,
		whiteSpace: 'nowrap' as const,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0D1117',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: sans,
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 620,
					opacity: containerOpacity,
					transform: `translateX(${cardTranslateX}px) scale(${containerScale}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					backgroundColor: '#11161D',
					border: '4px solid #8B949E',
					borderRadius: 34,
					boxShadow: `0px ${shadowPulse}px 0px #05080C`,
					display: 'flex',
					flexDirection: 'row',
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				{/* Review Sidebar */}
				<div
					style={{
						width: 260,
						backgroundColor: '#0D1117',
						borderRight: '3px solid #8B949E',
						padding: '28px 22px',
						display: 'flex',
						flexDirection: 'column',
						gap: 22,
						transform: `scale(${interpolate(sidebarEntrance, [0, 1], [0.94, 1], clamp)})`,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
						}}
					>
						<div
							style={{
								fontFamily: mono,
								fontSize: 18,
								fontWeight: 700,
								letterSpacing: '0.02em',
								color: '#8B949E',
								textTransform: 'uppercase',
							}}
						>
							#review-thread
						</div>

						<div
							style={{
								fontFamily: mono,
								fontSize: 74,
								fontWeight: 900,
								letterSpacing: '-0.05em',
								lineHeight: 0.88,
								color: '#79C0FF',
							}}
						>
							{reviewCountDisplay}
						</div>

						<div
							style={{
								fontFamily: sans,
								fontSize: 26,
								fontWeight: 800,
								lineHeight: 1.1,
								color: '#F0F6FC',
							}}
						>
							Incoming texts
						</div>
					</div>

					<div
						style={{
							height: 2,
							backgroundColor: '#26303A',
							width: '100%',
						}}
					/>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 12,
						}}
					>
						<div
							style={{
								fontFamily: mono,
								fontSize: 17,
								fontWeight: 700,
								color: '#8B949E',
							}}
						>
							@social-proof.diff
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 10,
							}}
						>
							<span
								style={{
									fontFamily: mono,
									fontSize: 20,
									fontWeight: 800,
									color: '#2EA043',
								}}
							>
								+4
							</span>
							<span
								style={{
									fontFamily: mono,
									fontSize: 20,
									fontWeight: 800,
									color: '#8B949E',
								}}
							>
								stamped
							</span>
						</div>
					</div>

					<div
						style={{
							marginTop: 'auto',
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
						}}
					>
						<div
							style={{
								fontFamily: mono,
								fontSize: 16,
								fontWeight: 700,
								color: '#8B949E',
							}}
						>
							anchor: live_count
						</div>
						<div
							style={{
								width: '100%',
								height: 14,
								backgroundColor: '#161B22',
								border: '2px solid #26303A',
								borderRadius: 999,
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									width: `${interpolate(frame, [24, 78], [0, 100], clamp)}%`,
									height: '100%',
									backgroundColor: '#79C0FF',
								}}
							/>
						</div>
					</div>
				</div>

				{/* Post Card + Diff Thread */}
				<div
					style={{
						flex: 1,
						backgroundColor: '#11161D',
						padding: '28px 28px 30px 28px',
						display: 'flex',
						flexDirection: 'column',
						gap: 24,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{/* top chrome */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 20,
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 14,
								minWidth: 0,
							}}
						>
							<div
								style={{
									width: 56,
									height: 56,
									borderRadius: 16,
									backgroundColor: '#79C0FF',
									border: '3px solid #0D1117',
									boxShadow: '0px 6px 0px #0D1117',
									flexShrink: 0,
								}}
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 4,
									minWidth: 0,
								}}
							>
								<div
									style={{
										fontFamily: sans,
										fontSize: 30,
										fontWeight: 900,
										lineHeight: 1,
										color: '#F0F6FC',
										whiteSpace: 'nowrap',
									}}
								>
									@founder-post
								</div>
								<div
									style={{
										fontFamily: mono,
										fontSize: 18,
										fontWeight: 700,
										lineHeight: 1.1,
										color: '#8B949E',
										whiteSpace: 'nowrap',
									}}
								>
									commit 25 / pull request thread
								</div>
							</div>
						</div>

						<div
							style={{
								backgroundColor: '#161B22',
								border: '3px solid #8B949E',
								borderRadius: 999,
								padding: '10px 18px',
								fontFamily: mono,
								fontSize: 18,
								fontWeight: 800,
								color: '#79C0FF',
								whiteSpace: 'nowrap',
								flexShrink: 0,
							}}
						>
							MERGE-READY
						</div>
					</div>

					{/* main post card */}
					<div
						style={{
							backgroundColor: '#0D1117',
							border: '3px solid #26303A',
							borderRadius: 24,
							padding: '24px 24px 22px 24px',
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
							}}
						>
							<div
								style={{
									fontFamily: mono,
									fontSize: 18,
									fontWeight: 700,
									color: '#8B949E',
								}}
							>
								## single_post.tsx
							</div>
							<div
								style={{
									fontFamily: sans,
									fontSize: 46,
									fontWeight: 900,
									lineHeight: 1.04,
									letterSpacing: '-0.03em',
									color: '#F0F6FC',
									maxWidth: '96%',
								}}
							>
								He actually did it.
							</div>
							<div
								style={{
									fontFamily: sans,
									fontSize: 28,
									fontWeight: 700,
									lineHeight: 1.18,
									color: '#8B949E',
									maxWidth: '95%',
								}}
							>
								The post lands, then the review thread turns praise into visible momentum.
							</div>
						</div>

						<div
							style={{
								height: 2,
								backgroundColor: '#26303A',
								width: '100%',
							}}
						/>

						{/* diff thread viewport */}
						<div
							style={{
								height: 260,
								overflow: 'hidden',
								position: 'relative',
								borderRadius: 18,
								backgroundColor: '#0B1015',
								border: '2px solid #1C242D',
								padding: '18px 18px 18px 18px',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									pointerEvents: 'none',
									background: `linear-gradient(90deg, transparent 0%, rgba(121,192,255,0.65) 48%, transparent 100%)`,
									transform: `translateX(${selectionSweep}px)`,
									opacity: selectionOpacity,
								}}
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 18,
									transform: `translateY(${threadScrollY}px)`,
								}}
							>
								{/* header row */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
									}}
								>
									<div
										style={{
											fontFamily: mono,
											fontSize: 18,
											fontWeight: 800,
											color: '#8B949E',
											width: 66,
											flexShrink: 0,
										}}
									>
										L+001
									</div>
									<div style={lineBar('48%', '#1D2730', 1)} />
								</div>

								{/* row 1 */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										gap: 18,
										minHeight: 42,
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 12,
											flex: 1,
											minWidth: 0,
										}}
									>
										<div
											style={{
												fontFamily: mono,
												fontSize: 18,
												fontWeight: 800,
												color: '#2EA043',
												width: 66,
												flexShrink: 0,
												opacity: rowReveal1,
											}}
										>
											+ wow
										</div>
										<div style={lineBar('54%', '#2EA043', rowReveal1)} />
										<div
											style={{
												fontFamily: mono,
												fontSize: 24,
												fontWeight: 900,
												color: '#F0F6FC',
												opacity: rowReveal1,
												whiteSpace: 'nowrap',
											}}
										>
											he did it
										</div>
									</div>
									<div style={stampStyle(stamp1, stampThunk1, pulse1, '#2EA043')}>
										✓
									</div>
								</div>

								{/* row 2 */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										gap: 18,
										minHeight: 42,
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 12,
											flex: 1,
											minWidth: 0,
										}}
									>
										<div
											style={{
												fontFamily: mono,
												fontSize: 18,
												fontWeight: 800,
												color: '#2EA043',
												width: 66,
												flexShrink: 0,
												opacity: rowReveal2,
											}}
										>
											+ nice
										</div>
										<div style={lineBar('45%', '#2EA043', rowReveal2)} />
										<div
											style={{
												fontFamily: mono,
												fontSize: 24,
												fontWeight: 900,
												color: '#F0F6FC',
												opacity: rowReveal2,
												whiteSpace: 'nowrap',
											}}
										>
											congrats
										</div>
									</div>
									<div style={stampStyle(stamp2, stampThunk2, pulse2, '#2EA043')}>
										✓
									</div>
								</div>

								{/* row 3 */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										gap: 18,
										minHeight: 42,
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 12,
											flex: 1,
											minWidth: 0,
										}}
									>
										<div
											style={{
												fontFamily: mono,
												fontSize: 18,
												fontWeight: 800,
												color: '#2EA043',
												width: 66,
												flexShrink: 0,
												opacity: rowReveal3,
											}}
										>
											+ huge
										</div>
										<div style={lineBar('58%', '#2EA043', rowReveal3)} />
										<div
											style={{
												fontFamily: mono,
												fontSize: 24,
												fontWeight: 900,
												color: '#F0F6FC',
												opacity: rowReveal3,
												whiteSpace: 'nowrap',
											}}
										>
											finally live
										</div>
									</div>
									<div style={stampStyle(stamp3, stampThunk3, pulse3, '#2EA043')}>
										✓
									</div>
								</div>

								{/* row 4 */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										gap: 18,
										minHeight: 42,
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 12,
											flex: 1,
											minWidth: 0,
										}}
									>
										<div
											style={{
												fontFamily: mono,
												fontSize: 18,
												fontWeight: 800,
												color: '#2EA043',
												width: 66,
												flexShrink: 0,
												opacity: rowReveal4,
											}}
										>
											+ inbox
										</div>
										<div style={lineBar('51%', '#2EA043', rowReveal4)} />
										<div
											style={{
												fontFamily: mono,
												fontSize: 24,
												fontWeight: 900,
												color: '#F0F6FC',
												opacity: rowReveal4,
												whiteSpace: 'nowrap',
											}}
										>
											30–40 texts
										</div>
									</div>
									<div style={stampStyle(stamp4, stampThunk4, pulse4, '#79C0FF')}>
										✓
									</div>
								</div>

								{/* filler rows for scroll context */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
									}}
								>
									<div
										style={{
											fontFamily: mono,
											fontSize: 18,
											fontWeight: 800,
											color: '#8B949E',
											width: 66,
											flexShrink: 0,
										}}
									>
										L+019
									</div>
									<div style={lineBar('38%', '#1D2730', 1)} />
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
									}}
								>
									<div
										style={{
											fontFamily: mono,
											fontSize: 18,
											fontWeight: 800,
											color: '#8B949E',
											width: 66,
											flexShrink: 0,
										}}
									>
										L+020
									</div>
									<div style={lineBar('44%', '#1D2730', 1)} />
								</div>
							</div>
						</div>
					</div>

					{/* bottom merge bar */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 20,
							backgroundColor: '#0D1117',
							border: '3px solid #26303A',
							borderRadius: 22,
							padding: '18px 22px',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
								minWidth: 0,
							}}
						>
							<div
								style={{
									fontFamily: mono,
									fontSize: 16,
									fontWeight: 700,
									color: '#8B949E',
								}}
							>
								#social-proof anchor locked
							</div>
							<div
								style={{
									fontFamily: sans,
									fontSize: 30,
									fontWeight: 900,
									lineHeight: 1.02,
									color: '#F0F6FC',
									whiteSpace: 'nowrap',
								}}
							>
								Praise became a measurable thread.
							</div>
						</div>

						<div
							style={{
								transform:
									frame > 72
										? `scale(${interpolate(frame, [72, 78, 84], [1, 0.94, 1], clamp)})`
										: 'scale(1)',
								backgroundColor: '#2EA043',
								border: '4px solid #0D1117',
								borderRadius: 18,
								padding: '16px 22px',
								boxShadow: `0px ${
									frame > 72 ? interpolate(frame, [72, 78, 84], [8, 2, 8], clamp) : 8
								}px 0px #0D1117`,
								fontFamily: sans,
								fontSize: 24,
								fontWeight: 900,
								color: '#0D1117',
								whiteSpace: 'nowrap',
								flexShrink: 0,
							}}
						>
							MERGED ✓
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}