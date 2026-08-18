import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene44() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy inbox entrance.
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 280,
			mass: 0.5,
		},
	});

	const footerEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 240,
			mass: 0.55,
		},
	});

	// Beat 2: Time races forward and the inbox fills.
	const messageCount = Math.round(
		interpolate(frame, [30, 77], [0, 999], clamp),
	);
	const messageLabel = frame >= 77 ? '999+' : String(messageCount);

	const timelineProgress = interpolate(frame, [30, 73], [0, 1], clamp);
	const timelineLabel =
		frame < 43 ? 'MONTHS' : frame < 58 ? '18 MONTHS' : 'YEARS';

	const stampEntrance = spring({
		frame: frame - 51,
		fps,
		config: {
			damping: 8,
			stiffness: 330,
			mass: 0.45,
		},
	});

	const clickFrame = frame >= 49 && frame <= 54;
	const cardThunk = clickFrame ? 8 : 0;
	const cursorVisible = frame >= 35 && frame <= 61;
	const cursorX = interpolate(frame, [35, 49], [150, 8], clamp);
	const cursorY = interpolate(frame, [35, 49], [95, 5], clamp);

	// Beat 3: Living physics, hard-float offsets and rhythmic stamp punches.
	const beat3Active = frame >= 84;
	const livingHover = Math.sin(frame * 0.12) * 6;
	const hardFloat = beat3Active
		? Math.floor((frame - 84) / 9) % 2 === 0
			? -6
			: 6
		: 0;
	const tilt = Math.sin(frame * 0.08) * 1.4;
	const shadowPulse = 13 + Math.sin(frame * 0.18) * 3;
	const stampPunch = beat3Active
		? 1 + (Math.floor((frame - 84) / 7) % 2 === 0 ? 0.055 : 0)
		: 1;

	const shineOffset = interpolate(
		(frame + 18) % 62,
		[0, 62],
		[-220, 760],
		clamp,
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 9, durationInFrames],
		[0, -70],
		clamp,
	);
	const exitScale = interpolate(
		frame,
		[durationInFrames - 8, durationInFrames],
		[1, 0.92],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 7, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const unreadBlocks = Array.from({length: 7}, (_, index) => {
		const cycle = ((frame - 78 - index * 4) % 34 + 34) % 34;
		const active = frame >= 78;
		const blockY = interpolate(cycle, [0, 34], [-46, 160], clamp);
		const blockOpacity = active
			? interpolate(cycle, [0, 3, 27, 34], [0, 0.82, 0.82, 0], clamp)
			: 0;

		return {
			index,
			blockY,
			blockOpacity,
			x: index % 2 === 0 ? 0 : 18,
		};
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				color: '#000000',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '80px 20px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px) scale(${exitScale})`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						flex: '0 0 15%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							padding: '10px 24px',
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								flexShrink: 0,
								borderRadius: 2,
								backgroundColor: '#F1F333',
								border: '2px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 950,
								letterSpacing: 2.5,
								lineHeight: 1,
								textDecoration: 'underline',
								textDecorationThickness: 3,
								textUnderlineOffset: 5,
								whiteSpace: 'nowrap',
							}}
						>
							LONG-TAIL INBOX
						</div>
					</div>
				</div>

				{/* Tier 2: The single hero inbox card */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: 0,
					}}
				>
					<div
						style={{
							position: 'relative',
							width: 'min(82%, 760px)',
							transform: `translateY(${
								livingHover + hardFloat + cardThunk
							}px) rotate(${tilt}deg) scale(${heroEntrance})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								minHeight: 340,
								boxSizing: 'border-box',
								padding: '38px 42px',
								backgroundColor: '#23A094',
								border: '6px solid #000000',
								borderRadius: 22,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
							}}
						>
							{/* Continuous traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									left: 0,
									width: 105,
									backgroundColor: 'rgba(255,255,255,0.22)',
									transform: `translateX(${shineOffset}px) skewX(-24deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Cascading unread blocks remain part of the one inbox hero */}
							<div
								style={{
									position: 'absolute',
									right: 24,
									top: 28,
									width: 72,
									height: 160,
									overflow: 'hidden',
									opacity: beat3Active ? 1 : 0.72,
								}}
							>
								{unreadBlocks.map((block) => (
									<div
										key={block.index}
										style={{
											position: 'absolute',
											top: 0,
											left: block.x,
											width: block.index % 2 === 0 ? 52 : 42,
											height: 20,
											border: '3px solid #000000',
											borderRadius: 4,
											backgroundColor:
												block.index % 3 === 0 ? '#F1F333' : '#FFF8E7',
											opacity: block.blockOpacity,
											transform: `translateY(${block.blockY}px)`,
											boxShadow: '3px 3px 0 #000000',
										}}
									/>
								))}
							</div>

							<div
								style={{
									position: 'relative',
									zIndex: 2,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
								}}
							>
								<div
									style={{
										padding: '8px 18px',
										backgroundColor: '#FFF8E7',
										border: '3px solid #000000',
										borderRadius: 8,
										boxShadow: '4px 4px 0 #000000',
										fontSize: 18,
										fontWeight: 950,
										letterSpacing: 3,
										lineHeight: 1,
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 4,
									}}
								>
									LATER
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 16,
										whiteSpace: 'nowrap',
									}}
								>
									<div
										style={{
											fontSize: 92,
											fontWeight: 1000,
											lineHeight: 0.9,
											letterSpacing: -4,
										}}
									>
										{messageLabel}
									</div>
									<div
										style={{
											fontSize: 23,
											fontWeight: 950,
											letterSpacing: 2,
											lineHeight: 1,
										}}
									>
										MESSAGES
									</div>
								</div>

								<div
									style={{
										width: 320,
										maxWidth: '72%',
										height: 18,
										padding: 3,
										boxSizing: 'border-box',
										backgroundColor: '#FFF8E7',
										border: '3px solid #000000',
										borderRadius: 4,
									}}
								>
									<div
										style={{
											width: `${timelineProgress * 100}%`,
											height: '100%',
											backgroundColor: '#F1F333',
										}}
									/>
								</div>

								<div
									style={{
										fontSize: 19,
										fontWeight: 950,
										letterSpacing: 4,
										lineHeight: 1,
									}}
								>
									{timelineLabel}
								</div>
							</div>

							{frame >= 49 && (
								<div
									style={{
										position: 'absolute',
										zIndex: 5,
										left: '50%',
										bottom: 27,
										padding: '10px 22px',
										backgroundColor: '#FF90E8',
										border: '5px solid #000000',
										borderRadius: 6,
										boxShadow: '6px 6px 0 #000000',
										fontSize: 25,
										fontWeight: 1000,
										letterSpacing: 1.5,
										lineHeight: 1,
										whiteSpace: 'nowrap',
										transform: `translateX(-50%) rotate(-5deg) scale(${
											stampEntrance * stampPunch
										})`,
									}}
								>
									THEY CAME BACK
								</div>
							)}
						</div>

						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									right: '14%',
									bottom: '5%',
									zIndex: 20,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										clickFrame ? 0.82 : 1
									})`,
								}}
							>
								<svg
									width="52"
									height="52"
									viewBox="0 0 24 24"
									fill="#000000"
									stroke="#FFF8E7"
									strokeWidth="1.5"
								>
									<path d="M4 3.5L11.2 21l2.45-7.1L21 11.2 4 3.5z" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3: Punchline */}
				<div
					style={{
						flex: '0 0 20%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							padding: '14px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: `${5 + Math.sin(frame * 0.18) * 2}px ${
								5 + Math.sin(frame * 0.18) * 2
							}px 0 #FF90E8`,
							transform: `translateY(${
								Math.sin(frame * 0.12 + 1.2) * 3
							}px) scale(${footerEntrance})`,
							fontSize: 23,
							fontWeight: 950,
							letterSpacing: 2,
							lineHeight: 1.2,
							textAlign: 'center',
							textDecoration: 'underline',
							textDecorationThickness: 3,
							textUnderlineOffset: 5,
							whiteSpace: 'nowrap',
						}}
					>
						YOUR CONTENT KEEPS WORKING
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}