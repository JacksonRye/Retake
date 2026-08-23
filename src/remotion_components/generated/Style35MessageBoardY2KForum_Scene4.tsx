import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style35MessageBoardY2KForum_Scene4() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: thread card entrance
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const entranceTranslateY = interpolate(entrance, [0, 1], [220, 0], clamp);
	const entranceScale = interpolate(entrance, [0, 1], [0.9, 1], clamp);
	const rowShadowCompress = interpolate(entrance, [0, 0.6, 1], [0, 20, 12], clamp);

	// ------------------------------------------
	// BEAT 2: project -> product state flip
	// 2D only: horizontal squash/expand illusion
	// ------------------------------------------
	const flipProgress = spring({
		frame: frame - 28,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.75},
	});

	const flipScaleX = interpolate(
		flipProgress,
		[0, 0.5, 1],
		[1, 0.08, 1],
		clamp
	);

	const isProductSide = flipProgress >= 0.52;

	const bgBlend = interpolate(flipProgress, [0, 1], [0, 1], clamp);
	const borderFlash = interpolate(
		flipProgress,
		[0, 0.45, 0.55, 1],
		[0, 0, 1, 1],
		clamp
	);

	const repliesCount = Math.round(
		interpolate(frame, [30, 70], [2, 148], clamp)
	);
	const visitorsCount = Math.round(
		interpolate(frame, [40, durationInFrames - 12], [84, 312], clamp)
	);
	const priceCount = Math.round(
		interpolate(frame, [36, 60], [0, 49], clamp)
	);

	const rankPop = spring({
		frame: frame - 46,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const badgeScale = interpolate(rankPop, [0, 0.7, 1], [1, 1.26, 1], clamp);

	const priceSnap = spring({
		frame: frame - 40,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const priceOpacity = interpolate(priceSnap, [0, 0.3, 1], [0, 0.7, 1], clamp);
	const priceTranslateY = interpolate(priceSnap, [0, 1], [12, 0], clamp);

	// ------------------------------------------
	// BEAT 3: living hover + marquee + exit
	// ------------------------------------------
	const hoverY = frame >= 68 ? Math.sin(frame * 0.12) * 8 - 10 : 0;
	const hoverTilt = frame >= 68 ? Math.sin(frame * 0.08) * 1.4 : 0;
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [12, 24]);

	const marqueeX = interpolate(
		frame,
		[68, durationInFrames - 8],
		[0, -520],
		clamp
	);

	const exit = spring({
		frame: frame - (durationInFrames - 10),
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.8},
	});

	const exitScale = interpolate(exit, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exit, [0, 1], [1, 0], clamp);

	const containerOpacity = interpolate(entrance, [0, 0.2], [0, 1], clamp) * exitOpacity;
	const containerScale = entranceScale * exitScale;

	const cardBackground = isProductSide
		? `linear-gradient(180deg, #F4F2EC 0%, #F9E1D6 100%)`
		: `linear-gradient(180deg, #F4F2EC 0%, #D6D9DE 100%)`;

	const headerLabel = isProductSide ? 'PRODUCT' : 'PROJECT';
	const titleLine = isProductSide
		? 'FOR SALE: Turn one build into a sellable tool'
		: 'WIP: Single project thread';
	const subtitleLine = isProductSide
		? 'Marketplace listing activated'
		: 'General discussion board';
	const rankLabel = isProductSide ? 'power user' : 'member';
	const rankBg = isProductSide ? '#0000EE' : '#D6D9DE';
	const rankColor = isProductSide ? '#F4F2EC' : '#2C3E70';
	const accentBar = isProductSide ? '#E25822' : '#2C3E70';
	const priceLabel = isProductSide ? `$${priceCount}` : '—';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#2C3E70',
				fontFamily: 'Verdana, Geneva, sans-serif',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 32,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'repeating-linear-gradient(180deg, rgba(244,242,236,0.03) 0px, rgba(244,242,236,0.03) 2px, transparent 2px, transparent 6px)',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '92%',
					minHeight: 560,
					opacity: containerOpacity,
					transform: `translateY(${entranceTranslateY + hoverY}px) scale(${containerScale}) rotate(${hoverTilt}deg)`,
					background: cardBackground,
					border: `4px solid ${borderFlash > 0.5 ? '#E25822' : '#0000EE'}`,
					borderRadius: 14,
					boxShadow: `0px ${Math.max(4, rowShadowCompress + shadowPulse * 0.35)}px 0px #000000`,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					color: '#2C3E70',
				}}
			>
				{/* Top utility/header row */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '18px 22px',
						backgroundColor: '#D6D9DE',
						borderBottom: '3px solid #2C3E70',
						gap: 16,
						flexWrap: 'nowrap',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							minWidth: 0,
							flex: 1,
						}}
					>
						<div
							style={{
								width: 62,
								height: 62,
								border: '3px solid #2C3E70',
								backgroundColor: isProductSide ? '#E25822' : '#D6D9DE',
								boxShadow: 'inset 0 0 0 3px #F4F2EC',
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)',
								gridTemplateRows: 'repeat(4, 1fr)',
								padding: 4,
								flexShrink: 0,
							}}
						>
							{new Array(16).fill(true).map((_, i) => {
								const on =
									isProductSide
										? [1, 2, 4, 7, 8, 9, 10, 13, 14].includes(i)
										: [0, 3, 5, 6, 9, 10, 12, 15].includes(i);
								return (
									<div
										key={i}
										style={{
											backgroundColor: on ? '#0000EE' : '#F4F2EC',
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
								gap: 6,
								minWidth: 0,
							}}
						>
							<div
								style={{
									fontSize: 20,
									fontWeight: 700,
									color: '#0000EE',
									textDecoration: 'underline',
									textTransform: 'uppercase',
									letterSpacing: '0.03em',
									whiteSpace: 'nowrap',
								}}
							>
								marketplace / build-log / activation
							</div>
							<div
								style={{
									fontSize: 34,
									fontWeight: 700,
									lineHeight: 1.08,
									color: '#2C3E70',
								}}
							>
								{titleLine}
							</div>
						</div>
					</div>

					<div
						style={{
							transform: `scale(${badgeScale})`,
							backgroundColor: rankBg,
							color: rankColor,
							border: '3px solid #2C3E70',
							padding: '8px 14px',
							fontSize: 18,
							fontWeight: 700,
							textTransform: 'uppercase',
							boxShadow: '0px 4px 0px #2C3E70',
							flexShrink: 0,
							whiteSpace: 'nowrap',
						}}
					>
						[{rankLabel}]
					</div>
				</div>

				{/* Hero content body */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 22,
						padding: '28px 28px 24px 28px',
						flex: 1,
					}}
				>
					{/* Flipping state block */}
					<div
						style={{
							transform: `scaleX(${flipScaleX})`,
							transformOrigin: 'center center',
							display: 'flex',
							flexDirection: 'column',
							gap: 0,
							border: '3px solid #2C3E70',
							backgroundColor: '#F4F2EC',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '14px 18px',
								backgroundColor: accentBar,
								color: '#F4F2EC',
								gap: 20,
							}}
						>
							<div
								style={{
									fontSize: 24,
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
									whiteSpace: 'nowrap',
								}}
							>
								{headerLabel}
							</div>
							<div
								style={{
									fontSize: 20,
									fontWeight: 700,
									textDecoration: 'underline',
									whiteSpace: 'nowrap',
								}}
							>
								view listing
							</div>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.2fr 0.8fr',
								gap: 0,
								minHeight: 210,
							}}
						>
							<div
								style={{
									padding: '22px 20px',
									borderRight: '3px solid #2C3E70',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									gap: 18,
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
											fontSize: 52,
											fontWeight: 700,
											lineHeight: 0.95,
											color: '#2C3E70',
											letterSpacing: '-0.03em',
										}}
									>
										{isProductSide ? 'Productized' : 'In Progress'}
									</div>
									<div
										style={{
											fontSize: 26,
											fontWeight: 700,
											lineHeight: 1.2,
											color: '#2C3E70',
										}}
									>
										{subtitleLine}
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 24,
										flexWrap: 'wrap',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 6,
										}}
									>
										<div
											style={{
												fontSize: 18,
												fontWeight: 700,
												textTransform: 'uppercase',
												color: '#0000EE',
												textDecoration: 'underline',
											}}
										>
											price
										</div>
										<div
											style={{
												opacity: isProductSide ? priceOpacity : 1,
												transform: `translateY(${isProductSide ? priceTranslateY : 0}px)`,
												fontSize: 46,
												fontWeight: 700,
												lineHeight: 1,
												color: isProductSide ? '#E25822' : '#2C3E70',
												minWidth: 90,
											}}
										>
											{priceLabel}
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 6,
										}}
									>
										<div
											style={{
												fontSize: 18,
												fontWeight: 700,
												textTransform: 'uppercase',
												color: '#0000EE',
												textDecoration: 'underline',
											}}
										>
											status
										</div>
										<div
											style={{
												fontSize: 26,
												fontWeight: 700,
												lineHeight: 1.1,
												color: '#2C3E70',
											}}
										>
											{isProductSide ? 'Ready to sell' : 'Just a thread'}
										</div>
									</div>
								</div>
							</div>

							<div
								style={{
									padding: '22px 18px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									gap: 18,
									backgroundColor: isProductSide ? '#F9E1D6' : '#F4F2EC',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 16,
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 4,
										}}
									>
										<div
											style={{
												fontSize: 18,
												fontWeight: 700,
												textTransform: 'uppercase',
												color: '#0000EE',
												textDecoration: 'underline',
											}}
										>
											new replies
										</div>
										<div
											style={{
												fontSize: 58,
												fontWeight: 700,
												lineHeight: 0.95,
												color: '#2C3E70',
												letterSpacing: '-0.03em',
											}}
										>
											{repliesCount}
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 4,
										}}
									>
										<div
											style={{
												fontSize: 18,
												fontWeight: 700,
												textTransform: 'uppercase',
												color: '#0000EE',
												textDecoration: 'underline',
											}}
										>
											visitors
										</div>
										<div
											style={{
												fontSize: 42,
												fontWeight: 700,
												lineHeight: 1,
												color: '#E25822',
											}}
										>
											{visitorsCount}
										</div>
									</div>
								</div>

								<div
									style={{
										fontSize: 20,
										fontWeight: 700,
										lineHeight: 1.2,
										color: '#2C3E70',
										textDecoration: 'underline',
									}}
								>
									{isProductSide ? 'seller reputation rising' : 'watch thread'}
								</div>
							</div>
						</div>
					</div>

					{/* Spoken line support block */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
							padding: '18px 20px',
							backgroundColor: '#D6D9DE',
							border: '3px solid #2C3E70',
						}}
					>
						<div
							style={{
								fontSize: 18,
								fontWeight: 700,
								textTransform: 'uppercase',
								color: '#0000EE',
								textDecoration: 'underline',
							}}
						>
							forum takeaway
						</div>
						<div
							style={{
								fontSize: 28,
								fontWeight: 700,
								lineHeight: 1.25,
								color: '#2C3E70',
							}}
						>
							A project can become a product.
						</div>
					</div>
				</div>

				{/* Footer marquee */}
				<div
					style={{
						height: 62,
						borderTop: '3px solid #2C3E70',
						backgroundColor: '#0000EE',
						overflow: 'hidden',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							whiteSpace: 'nowrap',
							transform: `translateX(${marqueeX}px)`,
							fontSize: 28,
							fontWeight: 700,
							color: '#F4F2EC',
							textTransform: 'uppercase',
							letterSpacing: '0.04em',
							paddingLeft: 24,
						}}
					>
						blow past everyone else • blow past everyone else • blow past everyone else •
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}