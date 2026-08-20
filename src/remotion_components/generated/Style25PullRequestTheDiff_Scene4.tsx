import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style25PullRequestTheDiff_Scene4() {
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
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const panelDropY = interpolate(entrance, [0, 1], [-220, 0], clamp);
	const panelScale = interpolate(entrance, [0, 1], [0.92, 1], clamp);
	const panelOpacity = interpolate(entrance, [0, 0.18], [0, 1], clamp);

	const approveButtonIntro = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 240, mass: 0.55},
	});

	// ------------------------------------------
	// BEAT 2 — Cursor + denial diff reveal
	// ------------------------------------------
	const cursorProgress = spring({
		frame: frame - 24,
		fps,
		config: {damping: 15, stiffness: 170, mass: 0.75},
	});

	const cursorX = interpolate(cursorProgress, [0, 1], [870, 660], clamp);
	const cursorY = interpolate(cursorProgress, [0, 1], [1410, 1180], clamp);

	const diffReveal1 = interpolate(frame, [34, 43], [0, 1], clamp);
	const diffReveal2 = interpolate(frame, [44, 53], [0, 1], clamp);
	const diffReveal3 = interpolate(frame, [54, 63], [0, 1], clamp);

	const denialProgress = spring({
		frame: frame - 52,
		fps,
		config: {damping: 12, stiffness: 260, mass: 0.6},
	});

	const stampScale = interpolate(denialProgress, [0, 0.7, 1], [1.4, 0.92, 1], clamp);
	const stampRotation = interpolate(denialProgress, [0, 1], [-14, -9], clamp);
	const stampOpacity = interpolate(denialProgress, [0, 0.15], [0, 1], clamp);

	const buttonDisableProgress = interpolate(frame, [48, 60], [0, 1], clamp);
	const buttonBg = `rgba(139, 148, 158, ${0.25 + buttonDisableProgress * 0.25})`;
	const buttonTextColor = interpolate(frame, [48, 60], [1, 0.55], clamp);
	const buttonShadowY = interpolate(frame, [48, 55, 62], [8, 2, 5], clamp);
	const buttonPressScale = interpolate(frame, [48, 55, 62], [1, 0.97, 0.985], clamp);

	// ------------------------------------------
	// BEAT 3 — Living idle + exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [18, 30]);

	const disabledPulse = interpolate(Math.sin(frame * 0.18), [-1, 1], [0.08, 0.18]);
	const stampBreath = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.985, 1.02]);

	const cursorJitterX = Math.sin(frame * 0.42) * 3;
	const cursorJitterY = Math.cos(frame * 0.34) * 2;

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 13, stiffness: 240, mass: 0.8},
	});

	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
	const exitY = interpolate(exitProgress, [0, 1], [0, 24], clamp);

	const containerOpacity = panelOpacity * exitOpacity;
	const containerScale = panelScale * exitScale;

	const line1Opacity = diffReveal1;
	const line2Opacity = diffReveal2;
	const line3Opacity = diffReveal3;

	const line1Translate = interpolate(diffReveal1, [0, 1], [24, 0], clamp);
	const line2Translate = interpolate(diffReveal2, [0, 1], [24, 0], clamp);
	const line3Translate = interpolate(diffReveal3, [0, 1], [24, 0], clamp);

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
					position: 'relative',
					width: '92%',
					minHeight: 1180,
					opacity: containerOpacity,
					transform: `translateY(${panelDropY + hoverY + exitY}px) scale(${containerScale}) rotate(${hoverTilt}deg)`,
					backgroundColor: '#0D1117',
					border: '4px solid #79C0FF',
					borderRadius: 34,
					boxShadow: `0px ${shadowPulse}px 0px rgba(121, 192, 255, 0.22)`,
					padding: '38px 36px 42px 36px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					overflow: 'hidden',
				}}
			>
				{/* Top chrome */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 22,
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 20,
							paddingBottom: 22,
							borderBottom: '2px solid rgba(139, 148, 158, 0.35)',
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
									width: 42,
									height: 42,
									borderRadius: 999,
									backgroundColor: '#2EA043',
									border: '3px solid #79C0FF',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 20,
									fontWeight: 900,
									color: '#0D1117',
									flexShrink: 0,
								}}
							>
								#
							</div>
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
										fontFamily:
											'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontSize: 22,
										fontWeight: 800,
										color: '#8B949E',
										letterSpacing: '0.04em',
										textTransform: 'uppercase',
									}}
								>
									pull request
								</div>
								<div
									style={{
										fontSize: 26,
										fontWeight: 700,
										color: '#79C0FF',
										whiteSpace: 'nowrap',
									}}
								>
									@future-reward / waiting-review
								</div>
							</div>
						</div>

						<div
							style={{
								transform: `scale(${approveButtonIntro})`,
								border: '3px solid #2EA043',
								borderRadius: 999,
								padding: '10px 18px',
								color: '#2EA043',
								fontSize: 20,
								fontWeight: 900,
								letterSpacing: '0.03em',
								backgroundColor: 'rgba(46, 160, 67, 0.08)',
								flexShrink: 0,
							}}
						>
							OPEN
						</div>
					</div>

					{/* Hero title */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<div
							style={{
								fontSize: 88,
								lineHeight: 0.92,
								fontWeight: 900,
								color: '#F0F6FC',
								letterSpacing: '-0.05em',
								wordBreak: 'break-word',
							}}
						>
							future_reward.patch
						</div>

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
									fontSize: 28,
									fontWeight: 800,
									color: '#8B949E',
								}}
							>
								0 files changed
							</div>
							<div
								style={{
									fontSize: 24,
									fontWeight: 800,
									color: '#8B949E',
								}}
							>
								•
							</div>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontSize: 28,
									fontWeight: 800,
									color: '#8B949E',
								}}
							>
								0 reviewers
							</div>
						</div>
					</div>

					{/* Diff area */}
					<div
						style={{
							marginTop: 8,
							backgroundColor: 'rgba(121, 192, 255, 0.04)',
							border: '3px solid rgba(121, 192, 255, 0.22)',
							borderRadius: 26,
							padding: '26px 24px',
							display: 'flex',
							flexDirection: 'column',
							gap: 18,
							minHeight: 380,
						}}
					>
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
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontSize: 24,
									fontWeight: 900,
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
									color: '#79C0FF',
								}}
							>
								diff preview
							</div>
							<div
								style={{
									fontSize: 20,
									fontWeight: 800,
									color: '#8B949E',
								}}
							>
								@@ empty fantasy / no changes staged @@
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 14,
								marginTop: 4,
							}}
						>
							<div
								style={{
									opacity: line1Opacity,
									transform: `translateY(${line1Translate}px)`,
									backgroundColor: 'rgba(248, 81, 73, 0.12)',
									border: '2px solid rgba(248, 81, 73, 0.4)',
									borderRadius: 18,
									padding: '18px 20px',
									display: 'flex',
									alignItems: 'flex-start',
									gap: 14,
								}}
							>
								<div
									style={{
										fontSize: 34,
										fontWeight: 900,
										color: '#F85149',
										lineHeight: 1,
										flexShrink: 0,
									}}
								>
									-
								</div>
								<div
									style={{
										fontSize: 36,
										fontWeight: 800,
										lineHeight: 1.15,
										color: '#F85149',
										wordBreak: 'break-word',
									}}
								>
									someday
								</div>
							</div>

							<div
								style={{
									opacity: line2Opacity,
									transform: `translateY(${line2Translate}px)`,
									backgroundColor: 'rgba(248, 81, 73, 0.12)',
									border: '2px solid rgba(248, 81, 73, 0.4)',
									borderRadius: 18,
									padding: '18px 20px',
									display: 'flex',
									alignItems: 'flex-start',
									gap: 14,
								}}
							>
								<div
									style={{
										fontSize: 34,
										fontWeight: 900,
										color: '#F85149',
										lineHeight: 1,
										flexShrink: 0,
									}}
								>
									-
								</div>
								<div
									style={{
										fontSize: 36,
										fontWeight: 800,
										lineHeight: 1.15,
										color: '#F85149',
										wordBreak: 'break-word',
									}}
								>
									someone arrives
								</div>
							</div>

							<div
								style={{
									opacity: line3Opacity,
									transform: `translateY(${line3Translate}px)`,
									backgroundColor: 'rgba(248, 81, 73, 0.12)',
									border: '2px solid rgba(248, 81, 73, 0.4)',
									borderRadius: 18,
									padding: '18px 20px',
									display: 'flex',
									alignItems: 'flex-start',
									gap: 14,
								}}
							>
								<div
									style={{
										fontSize: 34,
										fontWeight: 900,
										color: '#F85149',
										lineHeight: 1,
										flexShrink: 0,
									}}
								>
									-
								</div>
								<div
									style={{
										fontSize: 36,
										fontWeight: 800,
										lineHeight: 1.15,
										color: '#F85149',
										wordBreak: 'break-word',
									}}
								>
									and validates your excuse
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom action area */}
				<div
					style={{
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						gap: 26,
						marginTop: 30,
					}}
				>
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
								flexDirection: 'column',
								gap: 8,
							}}
						>
							<div
								style={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontSize: 24,
									fontWeight: 800,
									color: '#8B949E',
									textTransform: 'uppercase',
									letterSpacing: '0.04em',
								}}
							>
								review status
							</div>
							<div
								style={{
									fontSize: 30,
									fontWeight: 900,
									color: '#F0F6FC',
								}}
							>
								Awaiting impossible approval
							</div>
						</div>

						<div
							style={{
								transform: `scale(${buttonPressScale})`,
								minWidth: 330,
								padding: '22px 28px',
								borderRadius: 22,
								border: `4px solid ${buttonDisableProgress > 0.2 ? '#8B949E' : '#2EA043'}`,
								backgroundColor:
									buttonDisableProgress > 0.2
										? buttonBg
										: 'rgba(46, 160, 67, 0.14)',
								boxShadow: `0px ${buttonShadowY}px 0px ${
									buttonDisableProgress > 0.2 ? '#5B636B' : '#2EA043'
								}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								overflow: 'hidden',
								flexShrink: 0,
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backgroundColor: `rgba(248, 81, 73, ${disabledPulse})`,
									opacity: buttonDisableProgress,
								}}
							/>
							<div
								style={{
									position: 'relative',
									fontFamily:
										'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontSize: 30,
									fontWeight: 900,
									color:
										buttonDisableProgress > 0.2
											? `rgba(240,246,252,${buttonTextColor})`
											: '#2EA043',
									letterSpacing: '0.02em',
								}}
							>
								{buttonDisableProgress > 0.2 ? 'Approve Disabled' : 'Approve'}
							</div>
						</div>
					</div>

					<div
						style={{
							alignSelf: 'flex-start',
							opacity: stampOpacity,
							transform: `scale(${stampScale * stampBreath}) rotate(${stampRotation}deg)`,
							backgroundColor: 'rgba(248, 81, 73, 0.14)',
							border: '4px solid #F85149',
							borderRadius: 18,
							padding: '14px 20px',
							boxShadow: '0px 8px 0px rgba(248, 81, 73, 0.42)',
						}}
					>
						<div
							style={{
								fontFamily:
									'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
								fontSize: 30,
								fontWeight: 900,
								textTransform: 'uppercase',
								letterSpacing: '0.06em',
								color: '#F85149',
								whiteSpace: 'nowrap',
							}}
						>
							No reviewer assigned
						</div>
					</div>
				</div>

				{/* Cursor */}
				<div
					style={{
						position: 'absolute',
						left: cursorX + cursorJitterX,
						top: cursorY + cursorJitterY,
						width: 92,
						height: 92,
						pointerEvents: 'none',
						opacity: interpolate(frame, [18, 24], [0, 1], clamp) * exitOpacity,
						transform: `scale(${interpolate(cursorProgress, [0, 1], [0.9, 1], clamp)})`,
					}}
				>
					<svg
						width="92"
						height="92"
						viewBox="0 0 92 92"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 8L28 66L40 46L58 62L66 54L48 38L68 34L12 8Z"
							fill="#F0F6FC"
							stroke="#0D1117"
							strokeWidth="5"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		</AbsoluteFill>
	);
}