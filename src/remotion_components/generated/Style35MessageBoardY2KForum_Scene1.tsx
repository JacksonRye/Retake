import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style35MessageBoardY2KForum_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Thread row insert slam
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.72,
		},
	});

	const titleSnap = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.6,
		},
	});

	const badgeImpact = spring({
		frame: frame - 7,
		fps,
		config: {
			damping: 9,
			stiffness: 300,
			mass: 0.45,
		},
	});

	const rowTranslateY = interpolate(entrance, [0, 0.7, 1], [-420, 38, 0], clamp);
	const rowScale = interpolate(entrance, [0, 1], [0.92, 1], clamp);
	const rowOpacity = interpolate(entrance, [0, 0.15], [0, 1], clamp);

	const badgeJitter =
		frame >= 10 && frame <= 18
			? Math.sin((frame - 10) * 2.6) * 3.5 * (1 - (frame - 10) / 8)
			: 0;

	// ------------------------------------------
	// BEAT 2: Counter rollover + sticky activation
	// ------------------------------------------
	const countRaw = Math.round(interpolate(frame, [30, 84], [0, 999], clamp));
	const countDisplay = countRaw.toString().padStart(3, '0');

	const stickyProgress = spring({
		frame: frame - 48,
		fps,
		config: {
			damping: 13,
			stiffness: 190,
			mass: 0.7,
		},
	});

	const iconBg = stickyProgress < 0.5 ? '#D6D9DE' : '#E25822';
	const iconLabel = stickyProgress < 0.5 ? 'IDLE' : 'STICKY';
	const iconScale = interpolate(stickyProgress, [0, 0.5, 1], [1, 0.86, 1], clamp);
	const iconShadow = interpolate(stickyProgress, [0, 1], [4, 8], clamp);

	const countPop = frame >= 34 && frame <= 90 ? 1 + Math.sin(frame * 0.28) * 0.018 : 1;

	// ------------------------------------------
	// BEAT 3: Living CRT / marquee / hover / exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.6;
	const shimmerOpacity = interpolate(Math.sin(frame * 0.22), [-1, 1], [0.04, 0.1]);
	const underlinePulse = interpolate(Math.sin(frame * 0.16), [-1, 1], [0.7, 1]);
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [14, 24]);

	const marqueeLoop = -((frame * 2.2) % 520);

	const exitStart = durationInFrames - 12;
	const exitProgress = spring({
		frame: frame - exitStart,
		fps,
		config: {
			damping: 14,
			stiffness: 240,
			mass: 0.75,
		},
	});

	const exitTranslateY = interpolate(exitProgress, [0, 1], [0, 260], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.96], clamp);

	const containerOpacity = rowOpacity * exitOpacity;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F4F2EC',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 560,
					position: 'relative',
					opacity: containerOpacity,
					transform: `translateY(${rowTranslateY + hoverY + exitTranslateY}px) scale(${rowScale * exitScale}) rotate(${hoverTilt}deg)`,
					backgroundColor: '#D6D9DE',
					border: '4px solid #2C3E70',
					borderRadius: 18,
					boxShadow: `0px ${shadowPulse}px 0px #2C3E70`,
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* CRT shimmer overlay */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						pointerEvents: 'none',
						backgroundImage:
							'repeating-linear-gradient(to bottom, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
						opacity: shimmerOpacity,
						mixBlendMode: 'multiply',
					}}
				/>

				{/* Header bar */}
				<div
					style={{
						backgroundColor: '#2C3E70',
						color: '#F4F2EC',
						padding: '16px 20px',
						borderBottom: '4px solid #0000EE',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 16,
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: '0.02em',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						phpBB Topic View
					</div>

					<div
						style={{
							fontSize: 18,
							fontWeight: 700,
							color: '#D6D9DE',
							textDecoration: 'underline',
							textDecorationThickness: 2,
							textUnderlineOffset: 4,
							opacity: 0.95,
						}}
					>
						Forum Index
					</div>
				</div>

				{/* Main forum row */}
				<div
					style={{
						padding: '28px 24px 22px 24px',
						display: 'grid',
						gridTemplateColumns: '148px 1fr 170px',
						columnGap: 20,
						alignItems: 'stretch',
						backgroundColor: '#F4F2EC',
					}}
				>
					{/* Left user column */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 12,
							minWidth: 0,
						}}
					>
						<div
							style={{
								fontSize: 18,
								fontWeight: 700,
								color: '#2C3E70',
								textDecoration: 'underline',
								textDecorationThickness: 2,
								textUnderlineOffset: 3,
							}}
						>
							admin_mod
						</div>

						<div
							style={{
								width: 112,
								height: 112,
								border: '4px solid #2C3E70',
								backgroundColor: '#D6D9DE',
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)',
								gridTemplateRows: 'repeat(4, 1fr)',
								gap: 2,
								padding: 6,
								boxSizing: 'border-box',
								transform: `scale(${interpolate(
									spring({
										frame: frame - 8,
										fps,
										config: {damping: 12, stiffness: 210, mass: 0.6},
									}),
									[0, 1],
									[0.8, 1],
									clamp
								)})`,
							}}
						>
							{[
								'#2C3E70',
								'#D6D9DE',
								'#2C3E70',
								'#D6D9DE',
								'#D6D9DE',
								'#0000EE',
								'#0000EE',
								'#D6D9DE',
								'#D6D9DE',
								'#E25822',
								'#E25822',
								'#D6D9DE',
								'#2C3E70',
								'#D6D9DE',
								'#2C3E70',
								'#D6D9DE',
							].map((c, i) => (
								<div key={i} style={{backgroundColor: c}} />
							))}
						</div>

						<div
							style={{
								alignSelf: 'flex-start',
								transform: `translateX(${badgeJitter}px) scale(${interpolate(
									badgeImpact,
									[0, 1],
									[0.7, 1],
									clamp
								)})`,
								backgroundColor: '#E25822',
								color: '#F4F2EC',
								border: '3px solid #2C3E70',
								padding: '6px 10px',
								fontSize: 14,
								fontWeight: 800,
								lineHeight: 1,
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
								boxShadow: '0px 3px 0px #2C3E70',
							}}
						>
							[ELITE]
						</div>
					</div>

					{/* Center content column */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 18,
							minWidth: 0,
							justifyContent: 'space-between',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 12,
								minWidth: 0,
							}}
						>
							<div
								style={{
									transform: `scale(${interpolate(titleSnap, [0, 1], [0.9, 1], clamp)})`,
									transformOrigin: 'left center',
									fontSize: 58,
									fontWeight: 700,
									lineHeight: 1,
									color: '#0000EE',
									textDecoration: 'underline',
									textDecorationThickness: 4,
									textUnderlineOffset: 8,
									textDecorationColor: `rgba(0,0,238,${underlinePulse})`,
									letterSpacing: '-0.03em',
									textTransform: 'uppercase',
									wordBreak: 'break-word',
								}}
							>
								SKILLED DEVELOPMENT
							</div>

							<div
								style={{
									fontSize: 28,
									fontWeight: 400,
									lineHeight: 1.28,
									color: '#2C3E70',
									maxWidth: '100%',
								}}
							>
								The easiest way to get ahead in life is to commit to a period of
								skilled development.
							</div>
						</div>

						<div
							style={{
								borderTop: '3px dashed #2C3E70',
								paddingTop: 14,
								overflow: 'hidden',
								height: 42,
								display: 'flex',
								alignItems: 'center',
								backgroundColor: '#D6D9DE',
								borderLeft: '3px solid #2C3E70',
								borderRight: '3px solid #2C3E70',
								paddingLeft: 12,
								paddingRight: 12,
							}}
						>
							<div
								style={{
									whiteSpace: 'nowrap',
									transform: `translateX(${marqueeLoop}px)`,
									fontSize: 22,
									fontWeight: 700,
									color: '#0000EE',
									textDecoration: 'underline',
									textDecorationThickness: 2,
									textUnderlineOffset: 4,
								}}
							>
								commit • practice • improve • commit • practice • improve •
								commit • practice • improve •
							</div>
						</div>
					</div>

					{/* Right stats column */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 18,
							alignItems: 'stretch',
							justifyContent: 'space-between',
							minWidth: 0,
						}}
					>
						<div
							style={{
								transform: `scale(${iconScale})`,
								backgroundColor: iconBg,
								border: '4px solid #2C3E70',
								boxShadow: `0px ${iconShadow}px 0px #2C3E70`,
								padding: '14px 12px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 10,
							}}
						>
							<div
								style={{
									width: 16,
									height: 16,
									backgroundColor: stickyProgress < 0.5 ? '#2C3E70' : '#F4F2EC',
									border: '2px solid #2C3E70',
								}}
							/>
							<div
								style={{
									fontSize: 20,
									fontWeight: 800,
									color: stickyProgress < 0.5 ? '#2C3E70' : '#F4F2EC',
									letterSpacing: '0.04em',
									textTransform: 'uppercase',
									lineHeight: 1,
								}}
							>
								{iconLabel}
							</div>
						</div>

						<div
							style={{
								backgroundColor: '#D6D9DE',
								border: '4px solid #2C3E70',
								padding: '18px 12px',
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									fontSize: 18,
									fontWeight: 700,
									color: '#2C3E70',
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
									lineHeight: 1,
								}}
							>
								Posts
							</div>

							<div
								style={{
									transform: `scale(${countPop})`,
									fontSize: 72,
									fontWeight: 700,
									lineHeight: 0.95,
									color: '#0000EE',
									letterSpacing: '-0.05em',
									fontVariantNumeric: 'tabular-nums',
								}}
							>
								{countDisplay}
							</div>

							<div
								style={{
									fontSize: 16,
									fontWeight: 700,
									color: '#E25822',
									textDecoration: 'underline',
									textDecorationThickness: 2,
									textUnderlineOffset: 3,
									lineHeight: 1.2,
								}}
							>
								view latest reply
							</div>
						</div>
					</div>
				</div>

				{/* Footer links */}
				<div
					style={{
						borderTop: '4px solid #2C3E70',
						backgroundColor: '#D6D9DE',
						padding: '14px 20px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 20,
						flexWrap: 'nowrap',
					}}
				>
					<div
						style={{
							fontSize: 18,
							fontWeight: 700,
							color: '#0000EE',
							textDecoration: 'underline',
							textDecorationThickness: 2,
							textUnderlineOffset: 4,
							opacity: underlinePulse,
							whiteSpace: 'nowrap',
						}}
					>
						Post Reply
					</div>

					<div
						style={{
							fontSize: 18,
							fontWeight: 700,
							color: '#0000EE',
							textDecoration: 'underline',
							textDecorationThickness: 2,
							textUnderlineOffset: 4,
							opacity: 0.9,
							whiteSpace: 'nowrap',
						}}
					>
						Track Topic
					</div>

					<div
						style={{
							fontSize: 18,
							fontWeight: 700,
							color: '#0000EE',
							textDecoration: 'underline',
							textDecorationThickness: 2,
							textUnderlineOffset: 4,
							opacity: 0.9,
							whiteSpace: 'nowrap',
						}}
					>
						Send to Friend
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}