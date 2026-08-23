import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style35MessageBoardY2KForum_Scene3() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: composer entrance + tab stagger
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 180, mass: 0.75},
	});

	const panelTranslateY = interpolate(entrance, [0, 1], [220, 0], clamp);
	const panelScale = interpolate(entrance, [0, 1], [0.92, 1], clamp);
	const panelOpacity = interpolate(entrance, [0, 0.2], [0, 1], clamp);

	const tab1In = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});
	const tab2In = spring({
		frame: frame - 7,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});
	const tab3In = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ------------------------------------------
	// BEAT 2: tutorials -> projects switch
	// ------------------------------------------
	const switchProgress = spring({
		frame: frame - 30,
		fps,
		config: {damping: 13, stiffness: 190, mass: 0.7},
	});

	const isProjectsActive = frame >= 40;

	const watchingOpacity = interpolate(switchProgress, [0, 1], [1, 0.28], clamp);
	const buildingOpacity = interpolate(switchProgress, [0, 1], [0.35, 1], clamp);

	const title1In = spring({
		frame: frame - 37,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});
	const title2In = spring({
		frame: frame - 41,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});
	const title3In = spring({
		frame: frame - 45,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	const buttonPressed = frame >= 54;
	const buttonScale = buttonPressed
		? interpolate(frame, [54, 58, 63], [1, 0.94, 1], clamp)
		: 1;
	const buttonShadowY = buttonPressed
		? interpolate(frame, [54, 58, 63], [8, 2, 8], clamp)
		: 8;

	const postCount = Math.round(
		interpolate(frame, [36, 66], [0, 3], clamp),
	);

	// ------------------------------------------
	// BEAT 3: living forum physics + exit
	// ------------------------------------------
	const listScrollY = frame >= 84 ? Math.sin((frame - 84) * 0.08) * -10 : 0;
	const underlinePulse = interpolate(Math.sin(frame * 0.16), [-1, 1], [0.72, 1], clamp);
	const cursorJitterX = Math.sin(frame * 0.37) * 1.8;
	const cursorJitterY = Math.cos(frame * 0.29) * 1.4;
	const hoverY = Math.sin(frame * 0.12) * 7;
	const hoverTilt = Math.sin(frame * 0.08) * 1.2;
	const shadowPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [14, 24], clamp);

	const scanlineOffset = frame % 24;

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.8},
	});
	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
	const exitY = interpolate(exitProgress, [0, 1], [0, -50], clamp);

	const containerOpacity = panelOpacity * exitOpacity;
	const containerScale = panelScale * exitScale;

	const bodyLinkColor = '#0000EE';
	const borderColor = '#2C3E70';
	const panelBg = '#F4F2EC';
	const softGray = '#D6D9DE';
	const orange = '#E25822';
	const navy = '#2C3E70';

	const threadTitles = [
		'Personal Tool v1',
		'Client Helper',
		'Business Use Case',
	];

	const watchingLines = [
		'Top 25 tutorial threads',
		'Beginner playlist queue',
		'Save for later',
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#D6D9DE',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Verdana, Geneva, sans-serif',
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 560,
					opacity: containerOpacity,
					transform: `translateY(${panelTranslateY + hoverY + exitY}px) scale(${containerScale}) rotate(${hoverTilt}deg)`,
					backgroundColor: panelBg,
					border: `4px solid ${borderColor}`,
					borderRadius: 18,
					boxShadow: `0px ${shadowPulse}px 0px ${borderColor}`,
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Window chrome */}
				<div
					style={{
						height: 58,
						backgroundColor: softGray,
						borderBottom: `3px solid ${borderColor}`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '0 20px',
						flexShrink: 0,
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
						<div
							style={{
								width: 18,
								height: 18,
								backgroundColor: orange,
								border: `2px solid ${borderColor}`,
							}}
						/>
						<div
							style={{
								width: 18,
								height: 18,
								backgroundColor: '#F4F2EC',
								border: `2px solid ${borderColor}`,
							}}
						/>
						<div
							style={{
								width: 18,
								height: 18,
								backgroundColor: '#0000EE',
								border: `2px solid ${borderColor}`,
							}}
						/>
					</div>

					<div
						style={{
							fontSize: 24,
							fontWeight: 700,
							color: navy,
							letterSpacing: '0.02em',
						}}
					>
						FORUM COMPOSER.EXE
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
								padding: '4px 10px',
								backgroundColor: '#0000EE',
								color: '#FFFFFF',
								fontSize: 16,
								fontWeight: 700,
								border: `2px solid ${borderColor}`,
							}}
						>
							LVL 35
						</div>
					</div>
				</div>

				{/* Internal content */}
				<div
					style={{
						padding: '24px 24px 26px 24px',
						display: 'flex',
						flexDirection: 'column',
						gap: 18,
						flex: 1,
						position: 'relative',
					}}
				>
					{/* Top identity row */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '84px 1fr auto',
							alignItems: 'center',
							columnGap: 18,
							width: '100%',
						}}
					>
						<div
							style={{
								width: 84,
								height: 84,
								backgroundColor: '#D6D9DE',
								border: `3px solid ${borderColor}`,
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)',
								gridTemplateRows: 'repeat(4, 1fr)',
								overflow: 'hidden',
								flexShrink: 0,
							}}
						>
							{Array.from({length: 16}).map((_, i) => {
								const pixelOn = [1, 2, 4, 7, 8, 10, 13, 14].includes(i);
								const glitch =
									frame > 26 && frame < 42 && i % 3 === frame % 3
										? '#0000EE'
										: pixelOn
										? orange
										: '#F4F2EC';
								return (
									<div
										key={i}
										style={{
											backgroundColor: glitch,
											border: '1px solid rgba(44,62,112,0.18)',
										}}
									/>
								);
							})}
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
								minWidth: 0,
							}}
						>
							<div
								style={{
									fontSize: 34,
									fontWeight: 700,
									color: navy,
									lineHeight: 1.05,
								}}
							>
								ACTIVATION CODE
							</div>
							<div
								style={{
									fontSize: 18,
									fontWeight: 700,
									color: navy,
									lineHeight: 1.2,
								}}
							>
								Learning and building, not just binge watching tutorials all day
							</div>
							<div
								style={{
									fontSize: 16,
									color: bodyLinkColor,
									textDecoration: 'underline',
									fontWeight: 700,
									lineHeight: 1.2,
								}}
							>
								view-posting-mode / open-thread-composer / rank: creator
							</div>
						</div>

						<div
							style={{
								alignSelf: 'start',
								padding: '8px 14px',
								backgroundColor: orange,
								border: `3px solid ${borderColor}`,
								color: '#FFFFFF',
								fontSize: 18,
								fontWeight: 700,
								boxShadow: `0px 4px 0px ${borderColor}`,
								whiteSpace: 'nowrap',
							}}
						>
							POSTS {postCount}/3
						</div>
					</div>

					{/* Tabs */}
					<div
						style={{
							display: 'flex',
							alignItems: 'flex-end',
							gap: 14,
							flexWrap: 'wrap',
						}}
					>
						<div
							style={{
								transform: `scale(${interpolate(tab1In, [0, 1], [0.8, 1], clamp)})`,
								opacity: interpolate(tab1In, [0, 1], [0, 1], clamp),
								padding: '10px 14px 8px 14px',
								backgroundColor: isProjectsActive ? '#F4F2EC' : '#FFFFFF',
								border: `3px solid ${borderColor}`,
								borderBottomWidth: isProjectsActive ? 3 : 5,
								fontSize: 22,
								fontWeight: 700,
								color: navy,
								textDecoration: 'underline',
								boxShadow: isProjectsActive ? 'none' : `0px 4px 0px ${borderColor}`,
							}}
						>
							WATCHING
						</div>

						<div
							style={{
								transform: `scale(${interpolate(tab2In, [0, 1], [0.8, 1], clamp)})`,
								opacity: interpolate(tab2In, [0, 1], [0, 1], clamp),
								padding: '10px 14px 8px 14px',
								backgroundColor: isProjectsActive ? '#0000EE' : '#FFFFFF',
								border: `3px solid ${borderColor}`,
								borderBottomWidth: isProjectsActive ? 5 : 3,
								fontSize: 22,
								fontWeight: 700,
								color: isProjectsActive ? '#FFFFFF' : navy,
								textDecoration: 'underline',
								boxShadow: isProjectsActive ? `0px 4px 0px ${borderColor}` : 'none',
							}}
						>
							BUILDING
						</div>

						<div
							style={{
								transform: `scale(${interpolate(tab3In, [0, 1], [0.8, 1], clamp)})`,
								opacity: interpolate(tab3In, [0, 1], [0, 1], clamp),
								marginLeft: 'auto',
								padding: '10px 14px 8px 14px',
								backgroundColor: softGray,
								border: `3px solid ${borderColor}`,
								fontSize: 20,
								fontWeight: 700,
								color: navy,
								textDecoration: 'underline',
							}}
						>
							draft://new_thread
						</div>
					</div>

					{/* Main composer table */}
					<div
						style={{
							border: `3px solid ${borderColor}`,
							backgroundColor: '#FFFFFF',
							display: 'grid',
							gridTemplateColumns: '180px 1fr',
							flex: 1,
							minHeight: 300,
						}}
					>
						{/* Left labels */}
						<div
							style={{
								backgroundColor: softGray,
								borderRight: `3px solid ${borderColor}`,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<div
								style={{
									padding: '16px 14px',
									fontSize: 18,
									fontWeight: 700,
									color: navy,
									borderBottom: `2px solid ${borderColor}`,
								}}
							>
								STATE
							</div>
							<div
								style={{
									padding: '18px 14px',
									fontSize: 18,
									fontWeight: 700,
									color: navy,
									borderBottom: `2px solid ${borderColor}`,
								}}
							>
								SOURCE
							</div>
							<div
								style={{
									padding: '18px 14px',
									fontSize: 18,
									fontWeight: 700,
									color: navy,
									borderBottom: `2px solid ${borderColor}`,
								}}
							>
								THREADS
							</div>
							<div
								style={{
									padding: '18px 14px',
									fontSize: 18,
									fontWeight: 700,
									color: navy,
									flex: 1,
								}}
							>
								SUBMIT
							</div>
						</div>

						{/* Right content */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								minWidth: 0,
							}}
						>
							{/* State row */}
							<div
								style={{
									padding: '14px 18px',
									borderBottom: `2px solid ${borderColor}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
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
											fontSize: 20,
											fontWeight: 700,
											color: navy,
											lineHeight: 1.2,
										}}
									>
										mode:
									</div>
									<div
										style={{
											padding: '7px 12px',
											border: `2px solid ${borderColor}`,
											backgroundColor: '#FFFFFF',
											fontSize: 20,
											fontWeight: 700,
											color: navy,
											opacity: watchingOpacity,
											textDecoration: 'underline',
										}}
									>
										TUTORIALS
									</div>
									<div
										style={{
											padding: '7px 12px',
											border: `2px solid ${borderColor}`,
											backgroundColor: '#0000EE',
											fontSize: 20,
											fontWeight: 700,
											color: '#FFFFFF',
											opacity: buildingOpacity,
											textDecoration: 'underline',
											boxShadow: isProjectsActive
												? `0px 3px 0px ${borderColor}`
												: 'none',
										}}
									>
										PROJECTS
									</div>
								</div>

								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										color: orange,
										whiteSpace: 'nowrap',
									}}
								>
									status: ACTIVE
								</div>
							</div>

							{/* Source row */}
							<div
								style={{
									padding: '16px 18px',
									borderBottom: `2px solid ${borderColor}`,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										color: navy,
										lineHeight: 1.2,
									}}
								>
									not just binge watching tutorials all day
								</div>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										color: bodyLinkColor,
										textDecoration: 'underline',
										lineHeight: 1.2,
									}}
								>
									but creating a series of personal projects that you, others and
									businesses could benefit from
								</div>
							</div>

							{/* Threads row */}
							<div
								style={{
									padding: '14px 18px',
									borderBottom: `2px solid ${borderColor}`,
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
									flex: 1,
									justifyContent: 'center',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										transform: `translateY(${listScrollY}px)`,
										display: 'flex',
										flexDirection: 'column',
										gap: 10,
									}}
								>
									<div
										style={{
											opacity: watchingOpacity,
											display: 'flex',
											flexDirection: 'column',
											gap: 8,
										}}
									>
										{watchingLines.map((line) => (
											<div
												key={line}
												style={{
													fontSize: 20,
													fontWeight: 700,
													color: navy,
													lineHeight: 1.15,
													textDecoration: 'underline',
												}}
											>
												&gt; {line}
											</div>
										))}
									</div>

									<div
										style={{
											opacity: buildingOpacity,
											display: 'flex',
											flexDirection: 'column',
											gap: 10,
											marginTop: isProjectsActive ? 0 : -120,
										}}
									>
										{threadTitles.map((title, index) => {
											const progress =
												index === 0
													? title1In
													: index === 1
													? title2In
													: title3In;

											const rowOpacity = interpolate(progress, [0, 1], [0, 1], clamp);
											const rowX = interpolate(progress, [0, 1], [36, 0], clamp);

											return (
												<div
													key={title}
													style={{
														opacity: rowOpacity,
														transform: `translateX(${rowX}px)`,
														display: 'grid',
														gridTemplateColumns: '40px 1fr auto',
														alignItems: 'center',
														columnGap: 12,
														padding: '10px 12px',
														border: `2px solid ${borderColor}`,
														backgroundColor: index % 2 === 0 ? '#F4F2EC' : '#FFFFFF',
													}}
												>
													<div
														style={{
															fontSize: 18,
															fontWeight: 700,
															color: orange,
														}}
													>
														0{index + 1}
													</div>
													<div
														style={{
															fontSize: 26,
															fontWeight: 700,
															color: bodyLinkColor,
															textDecoration: 'underline',
															lineHeight: 1.1,
															textDecorationThickness: `${1 + underlinePulse}px`,
														}}
													>
														{title}
													</div>
													<div
														style={{
															fontSize: 16,
															fontWeight: 700,
															color: navy,
															whiteSpace: 'nowrap',
														}}
													>
														clickable
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>

							{/* Submit row */}
							<div
								style={{
									padding: '16px 18px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 18,
									flexWrap: 'wrap',
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										color: navy,
										lineHeight: 1.2,
									}}
								>
									posted threads for personal, client, and business value
								</div>

								<div
									style={{
										transform: `scale(${buttonScale})`,
										backgroundColor: orange,
										border: `3px solid ${borderColor}`,
										padding: '14px 22px',
										boxShadow: `0px ${buttonShadowY}px 0px ${borderColor}`,
										fontSize: 24,
										fontWeight: 700,
										color: '#FFFFFF',
										textDecoration: 'underline',
										whiteSpace: 'nowrap',
									}}
								>
									{buttonPressed ? 'THREAD POSTED' : 'SUBMIT THREAD'}
								</div>
							</div>
						</div>
					</div>

					{/* Marquee crawl */}
					<div
						style={{
							height: 44,
							border: `3px solid ${borderColor}`,
							backgroundColor: softGray,
							overflow: 'hidden',
							position: 'relative',
							flexShrink: 0,
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: `${interpolate(frame, [0, durationInFrames], [100, -140], clamp)}%`,
								top: 8,
								whiteSpace: 'nowrap',
								fontSize: 20,
								fontWeight: 700,
								color: bodyLinkColor,
								textDecoration: 'underline',
							}}
						>
							&gt;&gt; WATCHING → BUILDING &nbsp;&nbsp; &gt;&gt; PERSONAL PROJECTS
							&nbsp;&nbsp; &gt;&gt; CLIENT HELPER &nbsp;&nbsp; &gt;&gt; BUSINESS USE
							CASE &nbsp;&nbsp; &gt;&gt; CREATE, POST, SHIP
						</div>
					</div>
				</div>

				{/* Cursor */}
				<div
					style={{
						position: 'absolute',
						right: 128 + cursorJitterX,
						bottom: 118 + cursorJitterY,
						width: 0,
						height: 0,
						borderLeft: '14px solid transparent',
						borderRight: '4px solid transparent',
						borderTop: `24px solid ${borderColor}`,
						transform: 'rotate(-18deg)',
						filter: 'drop-shadow(2px 2px 0px #F4F2EC)',
					}}
				/>

				{/* Scanline drift */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						pointerEvents: 'none',
						backgroundImage:
							'repeating-linear-gradient(to bottom, rgba(44,62,112,0.06) 0px, rgba(44,62,112,0.06) 2px, rgba(244,242,236,0) 2px, rgba(244,242,236,0) 6px)',
						backgroundPositionY: scanlineOffset,
						opacity: 0.32,
						mixBlendMode: 'multiply',
					}}
				/>
			</div>
		</AbsoluteFill>
	);
}