import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_59() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance / gallery reveal
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.65},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 15, stiffness: 170, mass: 0.7},
	});

	const spotlightOpacity = interpolate(frame, [0, 12, 36], [0, 0.55, 0.28], clamp);
	const wallDolly = interpolate(frame, [0, durationInFrames - 1], [0, -18], clamp);

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const commissionValue = Math.round(interpolate(frame, [18, 58], [12, 50], clamp));
	const commissionText = `${commissionValue}% COMMISSION`;

	const frameStraighten = interpolate(frame, [20, 62], [2.2, 0], clamp);
	const frameShiftX = interpolate(frame, [16, 54], [26, 0], clamp);
	const frameShiftY = interpolate(frame, [16, 54], [18, 0], clamp);

	const labelReveal = interpolate(frame, [10, 28], [0, 1], clamp);
	const titleReveal = interpolate(frame, [14, 36], [0, 1], clamp);
	const metricReveal = interpolate(frame, [24, 52], [0, 1], clamp);
	const takeawayReveal = interpolate(frame, [44, 72], [0, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover / shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.4;
	const shineOffset = interpolate((frame + 12) % 72, [0, 72], [-220, 980], clamp);
	const labelFloat = Math.sin(frame * 0.1) * 3;
	const shadowPulse = 20 + Math.sin(frame * 0.16) * 3;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const typeOn = (text: string, progress: number) => {
		const count = Math.floor(text.length * progress);
		return text.slice(0, count);
	};

	const badgeText = typeOn('CATALOG NOTE 59', labelReveal);
	const titleText = typeOn('AUTOMATED MARGINS', titleReveal);
	const metricText = typeOn(commissionText, metricReveal);
	const takeawayText = typeOn('PURE SOFTWARE LEVERAGE', takeawayReveal);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F7F6F3',
				opacity,
				fontFamily:
					'"Baskerville", "Times New Roman", "Georgia", serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Museum wall spotlight */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(circle at 50% 28%, rgba(92,70,51,${spotlightOpacity}) 0%, rgba(92,70,51,${spotlightOpacity * 0.42}) 18%, rgba(247,246,243,0) 58%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Soft side vignette for gallery depth */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(90deg, rgba(110,106,100,0.08) 0%, rgba(247,246,243,0) 16%, rgba(247,246,243,0) 84%, rgba(110,106,100,0.08) 100%)',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '94%',
					maxWidth: 1040,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${wallDolly + exitY}px)`,
				}}
			>
				{/* Tier 1: Museum label badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${labelFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '12px 22px',
						border: '2px solid #6E6A64',
						backgroundColor: 'rgba(247,246,243,0.96)',
						borderRadius: 6,
						boxShadow: '0 8px 18px rgba(57,65,75,0.10)',
						minHeight: 50,
					}}
				>
					<div
						style={{
							color: '#6E6A64',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						{badgeText}
					</div>
				</div>

				{/* Tier 2: Massive framed hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#39414B',
							borderRadius: 12,
							border: '10px solid #5C4633',
							boxShadow: `0 ${shadowPulse}px 34px rgba(57,65,75,0.22)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '30px',
							boxSizing: 'border-box',
							transform: `translate(${frameShiftX}px, ${frameShiftY}px) rotate(${frameStraighten}deg)`,
						}}
					>
						{/* Outer matte */}
						<div
							style={{
								position: 'absolute',
								inset: 18,
								backgroundColor: '#F7F6F3',
								border: '2px solid rgba(110,106,100,0.45)',
								borderRadius: 4,
							}}
						/>

						{/* Shine sweep */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 110,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Inner layout */}
						<div
							style={{
								position: 'absolute',
								inset: 42,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								boxSizing: 'border-box',
								gap: 24,
							}}
						>
							{/* top label strip */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									borderBottom: '1.5px solid rgba(110,106,100,0.4)',
									paddingBottom: 14,
								}}
							>
								<div
									style={{
										color: '#76323F',
										fontSize: 17,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										fontWeight: 700,
										whiteSpace: 'nowrap',
									}}
								>
									Acquisition Study
								</div>
								<div
									style={{
										color: '#6E6A64',
										fontSize: 18,
										letterSpacing: 2,
										fontWeight: 700,
										whiteSpace: 'nowrap',
									}}
								>
									No. 050
								</div>
							</div>

							{/* hero content */}
							<div
								style={{
									flex: 1,
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 28,
									textAlign: 'center',
								}}
							>
								<div
									style={{
										color: '#6E6A64',
										fontSize: 72,
										lineHeight: 1.02,
										fontWeight: 700,
										letterSpacing: 1,
										textTransform: 'uppercase',
										maxWidth: '92%',
										minHeight: 150,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{titleText}
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '18px 34px',
										border: '3px solid #76323F',
										borderRadius: 8,
										backgroundColor: 'rgba(247,246,243,0.95)',
										minHeight: 98,
										minWidth: '72%',
										boxSizing: 'border-box',
									}}
								>
									<div
										style={{
											color: '#5C4633',
											fontSize: 58,
											lineHeight: 1,
											fontWeight: 700,
											letterSpacing: 1.2,
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>
							</div>

							{/* museum footer strip */}
							<div
								style={{
									width: '100%',
									display: 'grid',
									gridTemplateColumns: '1fr auto',
									alignItems: 'end',
									columnGap: 20,
									borderTop: '1.5px solid rgba(110,106,100,0.4)',
									paddingTop: 16,
								}}
							>
								<div
									style={{
										color: '#6E6A64',
										fontSize: 20,
										lineHeight: 1.25,
										fontStyle: 'italic',
									}}
								>
									Software-native value extraction through
									automated sales architecture.
								</div>
								<div
									style={{
										color: '#76323F',
										fontSize: 18,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontWeight: 700,
										whiteSpace: 'nowrap',
									}}
								>
									Wall Label
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#5C4633',
						borderRadius: 8,
						padding: '16px 28px',
						boxShadow: '0 10px 22px rgba(57,65,75,0.15)',
						minHeight: 58,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							color: '#F7F6F3',
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: 2.3,
							textTransform: 'uppercase',
							textAlign: 'center',
							whiteSpace: 'nowrap',
						}}
					>
						{takeawayText}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}