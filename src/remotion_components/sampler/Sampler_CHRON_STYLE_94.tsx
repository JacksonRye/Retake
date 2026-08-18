import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_94() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 250, mass: 0.5},
	});
	const cardIn = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.65},
	});
	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: active state changes
	const commissionValue = Math.round(interpolate(frame, [16, 56], [12, 50], clamp));
	const dialSpin = interpolate(frame, [10, 46], [0, 310], clamp);
	const clickPulse = interpolate(frame, [42, 48, 54], [0, 1, 0], clamp);
	const ledgerFill = interpolate(frame, [18, 60], [0, 1], clamp);
	const embossLight = interpolate((frame + 8) % 70, [0, 70], [-220, 780], clamp);

	// Beat 3: living loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const dialFloat = Math.sin(frame * 0.12 + 0.8) * 4;

	// Scene opacity / exit
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);

	const line1Width = `${30 + ledgerFill * 58}%`;
	const line2Width = `${22 + ledgerFill * 46}%`;
	const line3Width = `${18 + ledgerFill * 38}%`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1D4D3B',
				fontFamily:
					'"Arial Black", "Impact", "Helvetica Neue", sans-serif',
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '58px 18px 50px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						backgroundColor: '#23211C',
						border: '3px solid #AD8F3F',
						borderRadius: 18,
						padding: '12px 30px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 11,
							height: 11,
							borderRadius: '50%',
							backgroundColor: '#AD8F3F',
							boxShadow: `0 0 ${8 + clickPulse * 6}px rgba(173,143,63,0.55)`,
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F1EAD8',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3.2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2 */}
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
							minHeight: 548,
							backgroundColor: '#23211C',
							border: '4px solid #AD8F3F',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.48)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '40px 34px 34px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateColumns: '1.1fr 0.9fr',
							columnGap: 28,
							alignItems: 'stretch',
						}}
					>
						{/* Emboss light */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(241,234,216,0) 0%, rgba(241,234,216,0.16) 45%, rgba(241,234,216,0.04) 100%)',
								transform: `translateX(${embossLight}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Left certificate zone */}
						<div
							style={{
								height: '100%',
								border: '2px solid rgba(173,143,63,0.55)',
								borderRadius: 26,
								padding: '34px 28px 28px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								position: 'relative',
								background:
									'linear-gradient(180deg, rgba(241,234,216,0.03) 0%, rgba(89,51,46,0.08) 100%)',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: 16,
								}}
							>
								<div
									style={{
										color: '#AD8F3F',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 4,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									CERTIFIED SCALE
								</div>

								<div
									style={{
										color: '#F1EAD8',
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -1.5,
										textTransform: 'uppercase',
										maxWidth: '100%',
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 12,
									marginTop: 24,
								}}
							>
								<div
									style={{
										height: 3,
										width: line1Width,
										backgroundColor: '#AD8F3F',
										borderRadius: 999,
									}}
								/>
								<div
									style={{
										height: 3,
										width: line2Width,
										backgroundColor: 'rgba(241,234,216,0.8)',
										borderRadius: 999,
									}}
								/>
								<div
									style={{
										height: 3,
										width: line3Width,
										backgroundColor: 'rgba(241,234,216,0.45)',
										borderRadius: 999,
									}}
								/>
							</div>
						</div>

						{/* Right ledger / vault zone */}
						<div
							style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 22,
							}}
						>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										width: 160,
										height: 160,
										borderRadius: '50%',
										border: '4px solid #AD8F3F',
										background:
											'radial-gradient(circle at 35% 30%, rgba(241,234,216,0.18) 0%, rgba(173,143,63,0.1) 36%, rgba(89,51,46,0.28) 70%, rgba(35,33,28,1) 100%)',
										position: 'relative',
										transform: `translateY(${dialFloat}px) rotate(${dialSpin}deg)`,
										boxShadow:
											'inset 0 0 0 10px rgba(241,234,216,0.03), 0 12px 24px rgba(0,0,0,0.3)',
										flexShrink: 0,
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 24,
											borderRadius: '50%',
											border: '2px solid rgba(241,234,216,0.28)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: 10,
											width: 6,
											height: 28,
											marginLeft: -3,
											backgroundColor: '#F1EAD8',
											borderRadius: 999,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 22 + clickPulse * 10,
											height: 22 + clickPulse * 10,
											marginLeft: -(11 + clickPulse * 5),
											marginTop: -(11 + clickPulse * 5),
											borderRadius: '50%',
											backgroundColor: '#AD8F3F',
											boxShadow: `0 0 ${12 + clickPulse * 12}px rgba(173,143,63,0.45)`,
										}}
									/>
								</div>
							</div>

							<div
								style={{
									width: '100%',
									backgroundColor: '#1D4D3B',
									border: '3px solid #59332E',
									borderRadius: 24,
									padding: '22px 18px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 10,
									boxShadow: 'inset 0 0 0 1px rgba(241,234,216,0.05)',
								}}
							>
								<div
									style={{
										color: '#AD8F3F',
										fontSize: 17,
										fontWeight: 900,
										letterSpacing: 3.4,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									LEDGER RETURN
								</div>

								<div
									style={{
										color: '#F1EAD8',
										fontSize: 74,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: 1,
										fontVariantNumeric: 'tabular-nums',
										whiteSpace: 'nowrap',
										fontFamily:
											'"Courier New", "SFMono-Regular", Menlo, monospace',
									}}
								>
									{commissionValue}%
								</div>

								<div
									style={{
										color: '#F1EAD8',
										fontSize: 28,
										fontWeight: 900,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION
								</div>
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '0 4px',
									boxSizing: 'border-box',
									gap: 12,
								}}
							>
								<div
									style={{
										flex: 1,
										height: 2,
										backgroundColor: 'rgba(173,143,63,0.55)',
										borderRadius: 999,
									}}
								/>
								<div
									style={{
										color: '#AD8F3F',
										fontSize: 15,
										fontWeight: 900,
										letterSpacing: 3,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									VAULT ACTIVE
								</div>
								<div
									style={{
										flex: 1,
										height: 2,
										backgroundColor: 'rgba(173,143,63,0.55)',
										borderRadius: 999,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#AD8F3F',
						border: '2px solid rgba(35,33,28,0.18)',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 22px rgba(0,0,0,0.32)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#23211C',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}