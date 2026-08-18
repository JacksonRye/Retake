import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const PALETTE = {
	background: '#15202B',
	blue: '#1D9BF0',
	pink: '#F91880',
	green: '#00BA7C',
	text: '#E7E9EA',
	muted: '#8B98A5',
	card: '#192734',
	cardRaised: '#1E2D3A',
	border: '#33414D',
};

type IconName =
	| 'reply'
	| 'repost'
	| 'heart'
	| 'views'
	| 'quote'
	| 'check'
	| 'arrow';

const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

const formatMetric = (value: number): string => {
	if (value >= 1_000_000) {
		return `${(value / 1_000_000).toFixed(1)}M`;
	}
	if (value >= 1_000) {
		return `${(value / 1_000).toFixed(1)}K`;
	}
	return Math.round(value).toString();
};

const Icon: React.FC<{
	name: IconName;
	size?: number;
	color?: string;
	strokeWidth?: number;
}> = ({name, size = 20, color = 'currentColor', strokeWidth = 1.8}) => {
	const paths: Record<IconName, React.ReactNode> = {
		reply: (
			<>
				<path d="M21 11.5a8.1 8.1 0 0 1-8.4 8.1 9.8 9.8 0 0 1-3.9-.8L3 21l1.7-5A8.1 8.1 0 1 1 21 11.5Z" />
			</>
		),
		repost: (
			<>
				<path d="m17 2.8 3.2 3.3L17 9.3" />
				<path d="M4.2 10V8.6a2.5 2.5 0 0 1 2.5-2.5h13.1" />
				<path d="m7 21.2-3.2-3.3L7 14.7" />
				<path d="M19.8 14v1.4a2.5 2.5 0 0 1-2.5 2.5H4.2" />
			</>
		),
		heart: (
			<path d="M12 20.5S3.5 15.7 3.5 9.2A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.5 2.9c0 6.5-8.5 11.3-8.5 11.3Z" />
		),
		views: (
			<>
				<path d="M4 20V10" />
				<path d="M9.3 20V4" />
				<path d="M14.7 20v-7" />
				<path d="M20 20V7" />
			</>
		),
		quote: (
			<>
				<path d="M5 7h5v5H6.5A4.5 4.5 0 0 1 11 16.5" />
				<path d="M14 7h5v5h-3.5a4.5 4.5 0 0 1 4.5 4.5" />
			</>
		),
		check: <path d="m5 12.5 4.1 4.1L19.5 6.4" />,
		arrow: (
			<>
				<path d="M5 12h14" />
				<path d="m14 7 5 5-5 5" />
			</>
		),
	};

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			{paths[name]}
		</svg>
	);
};

const Avatar: React.FC<{
	initials: string;
	from: string;
	to: string;
	size?: number;
}> = ({initials, from, to, size = 52}) => (
	<div
		style={{
			width: size,
			height: size,
			flexShrink: 0,
			borderRadius: '50%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: `linear-gradient(145deg, ${from}, ${to})`,
			color: '#FFFFFF',
			fontSize: size * 0.31,
			fontWeight: 900,
			letterSpacing: -0.5,
			boxShadow:
				'0 0 0 3px #192734, 0 0 0 4px rgba(231,233,234,0.16), 0 8px 20px rgba(0,0,0,0.3)',
		}}
	>
		{initials}
	</div>
);

const Verified: React.FC = () => (
	<span
		style={{
			width: 17,
			height: 17,
			borderRadius: '50%',
			backgroundColor: PALETTE.blue,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: 5,
		}}
	>
		<Icon name="check" size={12} color="#FFFFFF" strokeWidth={3} />
	</span>
);

const Metric: React.FC<{
	icon: IconName;
	value: number;
	target: number;
	color?: string;
}> = ({icon, value, target, color = PALETTE.muted}) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: 8,
			minWidth: 92,
			color,
			fontSize: 15,
			fontWeight: 650,
			fontVariantNumeric: 'tabular-nums',
		}}
	>
		<Icon name={icon} size={19} color={color} />
		<span>{formatMetric(Math.min(value, target))}</span>
	</div>
);

const RepostBadge: React.FC<{count: number; opacity?: number}> = ({
	count,
	opacity = 1,
}) => (
	<div
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 7,
			padding: '7px 12px',
			borderRadius: 999,
			backgroundColor: 'rgba(0,186,124,0.13)',
			border: '1px solid rgba(0,186,124,0.38)',
			color: PALETTE.green,
			fontSize: 13,
			fontWeight: 800,
			opacity,
			boxShadow: '0 0 20px rgba(0,186,124,0.08)',
		}}
	>
		<Icon name="repost" size={16} color={PALETTE.green} strokeWidth={2.2} />
		{formatMetric(count)} REPOSTS
	</div>
);

type PostCardProps = {
	frame: number;
	fps: number;
	delay: number;
	x: number;
	y: number;
	width: number;
	accent: string;
	index: string;
	name: string;
	handle: string;
	initials: string;
	avatarFrom: string;
	avatarTo: string;
	body: React.ReactNode;
	time: string;
	baseMetrics: {
		replies: number;
		reposts: number;
		likes: number;
		views: number;
	};
	hero?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
	frame,
	fps,
	delay,
	x,
	y,
	width,
	accent,
	index,
	name,
	handle,
	initials,
	avatarFrom,
	avatarTo,
	body,
	time,
	baseMetrics,
	hero = false,
}) => {
	const localFrame = frame - delay;
	const entrance = spring({
		frame: localFrame,
		fps,
		config: {
			damping: 15,
			stiffness: 125,
			mass: 0.75,
		},
	});

	const slideY = interpolate(entrance, [0, 1], [-115, 0]);
	const scale = interpolate(entrance, [0, 1], [0.94, 1]);
	const opacity = interpolate(localFrame, [0, 9], [0, 1], clamp);
	const metricProgress = interpolate(localFrame, [10, 52], [0, 1], {
		...clamp,
		easing: Easing.out(Easing.cubic),
	});

	const glow = interpolate(
		Math.sin(Math.max(0, localFrame) / 11),
		[-1, 1],
		[0.12, 0.28],
	);

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width,
				padding: hero ? '25px 28px 23px' : '21px 24px 19px',
				borderRadius: hero ? 24 : 20,
				background: `linear-gradient(145deg, ${PALETTE.cardRaised}, ${PALETTE.card})`,
				border: `1px solid ${
					hero ? 'rgba(29,155,240,0.38)' : 'rgba(231,233,234,0.13)'
				}`,
				boxShadow: hero
					? `0 25px 70px rgba(0,0,0,0.42), 0 0 45px rgba(29,155,240,${glow})`
					: '0 18px 44px rgba(0,0,0,0.34)',
				transform: `translateY(${slideY}px) scale(${scale})`,
				transformOrigin: '50% 0%',
				opacity,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					bottom: 0,
					width: 4,
					backgroundColor: accent,
					boxShadow: `0 0 18px ${accent}`,
				}}
			/>

			<div
				style={{
					position: 'absolute',
					right: 18,
					top: 16,
					color: 'rgba(231,233,234,0.1)',
					fontSize: 62,
					fontWeight: 950,
					lineHeight: 1,
					letterSpacing: -4,
				}}
			>
				{index}
			</div>

			<div style={{display: 'flex', alignItems: 'center', gap: 13}}>
				<Avatar
					initials={initials}
					from={avatarFrom}
					to={avatarTo}
					size={hero ? 55 : 48}
				/>
				<div style={{minWidth: 0}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							color: PALETTE.text,
							fontSize: hero ? 17 : 15,
							fontWeight: 850,
						}}
					>
						{name}
						<Verified />
					</div>
					<div
						style={{
							color: PALETTE.muted,
							fontSize: 14,
							marginTop: 2,
						}}
					>
						{handle} · {time}
					</div>
				</div>
			</div>

			<div
				style={{
					marginTop: hero ? 20 : 16,
					color: PALETTE.text,
					fontSize: hero ? 27 : 20,
					lineHeight: hero ? 1.32 : 1.4,
					fontWeight: hero ? 720 : 620,
					letterSpacing: hero ? -0.6 : -0.25,
					paddingRight: 22,
				}}
			>
				{body}
			</div>

			<div
				style={{
					height: 1,
					backgroundColor: 'rgba(231,233,234,0.11)',
					margin: hero ? '21px 0 16px' : '17px 0 14px',
				}}
			/>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 16,
				}}
			>
				<Metric
					icon="reply"
					value={baseMetrics.replies * metricProgress}
					target={baseMetrics.replies}
				/>
				<Metric
					icon="repost"
					value={baseMetrics.reposts * metricProgress}
					target={baseMetrics.reposts}
					color={PALETTE.green}
				/>
				<Metric
					icon="heart"
					value={baseMetrics.likes * metricProgress}
					target={baseMetrics.likes}
					color={PALETTE.pink}
				/>
				<Metric
					icon="views"
					value={baseMetrics.views * metricProgress}
					target={baseMetrics.views}
					color={PALETTE.blue}
				/>
			</div>
		</div>
	);
};

const QuoteCard: React.FC<{
	frame: number;
	fps: number;
	delay: number;
	x: number;
	y: number;
	width: number;
	direction: 'left' | 'right';
	name: string;
	handle: string;
	initials: string;
	text: string;
	reposts: number;
	accent: string;
}> = ({
	frame,
	fps,
	delay,
	x,
	y,
	width,
	direction,
	name,
	handle,
	initials,
	text,
	reposts,
	accent,
}) => {
	const localFrame = frame - delay;
	const bounce = spring({
		frame: localFrame,
		fps,
		config: {
			damping: 10,
			stiffness: 145,
			mass: 0.65,
		},
	});

	const offset = interpolate(
		bounce,
		[0, 1],
		[direction === 'left' ? 110 : -110, 0],
	);
	const rotate = interpolate(
		bounce,
		[0, 1],
		[direction === 'left' ? -5 : 5, direction === 'left' ? -1.2 : 1.2],
	);
	const opacity = interpolate(localFrame, [0, 8], [0, 1], clamp);
	const countProgress = interpolate(localFrame, [8, 38], [0, 1], {
		...clamp,
		easing: Easing.out(Easing.quad),
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width,
				padding: '18px 19px',
				borderRadius: 18,
				background:
					'linear-gradient(145deg, rgba(30,45,58,0.98), rgba(21,32,43,0.98))',
				border: `1px solid ${accent}66`,
				boxShadow: `0 18px 45px rgba(0,0,0,0.38), 0 0 28px ${accent}18`,
				transform: `translateX(${offset}px) rotate(${rotate}deg) scale(${interpolate(
					bounce,
					[0, 1],
					[0.85, 1],
				)})`,
				opacity,
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 13,
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<Avatar
						initials={initials}
						from={accent}
						to={PALETTE.background}
						size={38}
					/>
					<div>
						<div
							style={{
								color: PALETTE.text,
								fontSize: 14,
								fontWeight: 800,
							}}
						>
							{name}
						</div>
						<div style={{color: PALETTE.muted, fontSize: 12}}>
							{handle}
						</div>
					</div>
				</div>
				<div
					style={{
						width: 29,
						height: 29,
						borderRadius: 9,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: `${accent}20`,
					}}
				>
					<Icon name="quote" size={17} color={accent} />
				</div>
			</div>

			<div
				style={{
					color: PALETTE.text,
					fontSize: 16,
					lineHeight: 1.42,
					fontWeight: 590,
				}}
			>
				{text}
			</div>

			<div style={{marginTop: 15}}>
				<RepostBadge
					count={reposts * countProgress}
					opacity={interpolate(localFrame, [8, 16], [0, 1], clamp)}
				/>
			</div>
		</div>
	);
};

export default function TestGpt56SolComponent() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, width, height} = useVideoConfig();

	const designWidth = 1920;
	const designHeight = 1080;
	const sceneScale = Math.min(width / designWidth, height / designHeight);

	const globalOpacity = interpolate(
		frame,
		[0, 10, Math.max(11, durationInFrames - 14), durationInFrames - 1],
		[0, 1, 1, 0],
		clamp,
	);

	const headerEntrance = spring({
		frame,
		fps,
		config: {damping: 16, stiffness: 110, mass: 0.7},
	});

	const connectorProgress = interpolate(frame, [17, 53], [0, 1], {
		...clamp,
		easing: Easing.inOut(Easing.cubic),
	});

	const scannerX = interpolate(
		frame,
		[0, Math.max(1, durationInFrames - 1)],
		[-280, 2200],
		clamp,
	);

	const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.45, 1]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: PALETTE.background,
				overflow: 'hidden',
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				opacity: globalOpacity,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
						radial-gradient(circle at 51% 38%, rgba(29,155,240,0.13), transparent 33%),
						radial-gradient(circle at 18% 72%, rgba(249,24,128,0.08), transparent 27%),
						radial-gradient(circle at 87% 63%, rgba(0,186,124,0.08), transparent 28%),
						linear-gradient(rgba(231,233,234,0.025) 1px, transparent 1px),
						linear-gradient(90deg, rgba(231,233,234,0.025) 1px, transparent 1px)
					`,
					backgroundSize: 'auto, auto, auto, 48px 48px, 48px 48px',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					top: 0,
					left: scannerX,
					width: 260,
					height: '100%',
					transform: 'skewX(-18deg)',
					background:
						'linear-gradient(90deg, transparent, rgba(29,155,240,0.035), transparent)',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: designWidth,
					height: designHeight,
					transform: `translate(-50%, -50%) scale(${sceneScale})`,
					transformOrigin: 'center',
				}}
			>
				{/* Header */}
				<div
					style={{
						position: 'absolute',
						left: 92,
						right: 92,
						top: 45,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						transform: `translateY(${interpolate(
							headerEntrance,
							[0, 1],
							[-40, 0],
						)}px)`,
						opacity: interpolate(frame, [0, 9], [0, 1], clamp),
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								padding: '9px 15px',
								borderRadius: 999,
								backgroundColor: PALETTE.blue,
								color: '#FFFFFF',
								fontSize: 13,
								fontWeight: 900,
								letterSpacing: 1.2,
								boxShadow: '0 8px 28px rgba(29,155,240,0.28)',
							}}
						>
							<span
								style={{
									width: 7,
									height: 7,
									borderRadius: '50%',
									backgroundColor: '#FFFFFF',
									opacity: pulse,
								}}
							/>
							THREAD ANATOMY
						</div>
						<div
							style={{
								color: PALETTE.text,
								fontSize: 27,
								fontWeight: 850,
								letterSpacing: -0.7,
							}}
						>
							Post-Mortem
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							color: PALETTE.muted,
							fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
							fontSize: 13,
							letterSpacing: 0.7,
						}}
					>
						<span style={{color: PALETTE.green}}>● LIVE CAPTURE</span>
						<span style={{opacity: 0.45}}>/</span>
						<span>VIRALITY INDEX 94.7</span>
					</div>
				</div>

				{/* Thread spine and quote branches */}
				<svg
					width={designWidth}
					height={designHeight}
					viewBox={`0 0 ${designWidth} ${designHeight}`}
					style={{
						position: 'absolute',
						inset: 0,
						pointerEvents: 'none',
						overflow: 'visible',
					}}
				>
					<defs>
						<linearGradient id="threadGradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={PALETTE.blue} />
							<stop offset="55%" stopColor={PALETTE.green} />
							<stop offset="100%" stopColor={PALETTE.pink} />
						</linearGradient>
						<filter id="threadGlow">
							<feGaussianBlur stdDeviation="5" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					<path
						d="M 470 205 C 438 205, 438 525, 470 525 L 470 835"
						fill="none"
						stroke="rgba(231,233,234,0.12)"
						strokeWidth="4"
						strokeLinecap="round"
					/>
					<path
						d="M 470 205 C 438 205, 438 525, 470 525 L 470 835"
						fill="none"
						stroke="url(#threadGradient)"
						strokeWidth="4"
						strokeLinecap="round"
						pathLength="1"
						strokeDasharray="1"
						strokeDashoffset={1 - connectorProgress}
						filter="url(#threadGlow)"
					/>

					<path
						d="M 475 375 C 360 375, 350 350, 314 350"
						fill="none"
						stroke={PALETTE.pink}
						strokeOpacity={0.7 * connectorProgress}
						strokeWidth="2.5"
						strokeDasharray="7 9"
					/>
					<path
						d="M 1407 593 C 1510 593, 1518 550, 1572 550"
						fill="none"
						stroke={PALETTE.green}
						strokeOpacity={0.7 * connectorProgress}
						strokeWidth="2.5"
						strokeDasharray="7 9"
					/>
					<path
						d="M 475 785 C 355 785, 350 828, 315 828"
						fill="none"
						stroke={PALETTE.blue}
						strokeOpacity={0.65 * connectorProgress}
						strokeWidth="2.5"
						strokeDasharray="7 9"
					/>
				</svg>

				{/* Primary post stack */}
				<PostCard
					frame={frame}
					fps={fps}
					delay={8}
					x={475}
					y={125}
					width={930}
					accent={PALETTE.blue}
					index="01"
					name="Maya Chen"
					handle="@mayabuilds"
					initials="MC"
					avatarFrom="#1D9BF0"
					avatarTo="#7C3AED"
					time="9:41 AM"
					hero
					body={
						<>
							The best products don’t remove complexity.
							<br />
							<span style={{color: PALETTE.blue}}>
								They move it somewhere users never have to see.
							</span>
						</>
					}
					baseMetrics={{
						replies: 2840,
						reposts: 14800,
						likes: 42100,
						views: 942000,
					}}
				/>

				<PostCard
					frame={frame}
					fps={fps}
					delay={24}
					x={475}
					y={465}
					width={930}
					accent={PALETTE.green}
					index="02"
					name="Maya Chen"
					handle="@mayabuilds"
					initials="MC"
					avatarFrom="#1D9BF0"
					avatarTo="#7C3AED"
					time="9:44 AM"
					body={
						<>
							We replaced 14 configuration steps with one decision:
							<span style={{color: PALETTE.green}}>
								{' '}
								“What outcome do you want?”
							</span>
						</>
					}
					baseMetrics={{
						replies: 1100,
						reposts: 7900,
						likes: 26300,
						views: 518000,
					}}
				/>

				<PostCard
					frame={frame}
					fps={fps}
					delay={40}
					x={475}
					y={735}
					width={930}
					accent={PALETTE.pink}
					index="03"
					name="Maya Chen"
					handle="@mayabuilds"
					initials="MC"
					avatarFrom="#1D9BF0"
					avatarTo="#7C3AED"
					time="9:49 AM"
					body={
						<>
							The result: activation rose 38%.
							<span style={{color: PALETTE.pink}}>
								{' '}
								Not from more features—from fewer visible choices.
							</span>
						</>
					}
					baseMetrics={{
						replies: 936,
						reposts: 6400,
						likes: 21900,
						views: 401000,
					}}
				/>

				{/* Branching quote posts */}
				<QuoteCard
					frame={frame}
					fps={fps}
					delay={31}
					x={72}
					y={278}
					width={315}
					direction="left"
					name="Alex Rivera"
					handle="@alexdesigns"
					initials="AR"
					text="This is the clearest explanation of product abstraction I’ve seen all year."
					reposts={3800}
					accent={PALETTE.pink}
				/>

				<QuoteCard
					frame={frame}
					fps={fps}
					delay={45}
					x={1518}
					y={472}
					width={330}
					direction="right"
					name="Nora Fields"
					handle="@norafields"
					initials="NF"
					text="Teams keep adding onboarding. Great teams redesign the decision."
					reposts={2100}
					accent={PALETTE.green}
				/>

				<QuoteCard
					frame={frame}
					fps={fps}
					delay={55}
					x={68}
					y={750}
					width={320}
					direction="left"
					name="Sam Okafor"
					handle="@samships"
					initials="SO"
					text="Complexity didn’t disappear. The product team simply absorbed it."
					reposts={1700}
					accent={PALETTE.blue}
				/>

				{/* Analysis footer */}
				<div
					style={{
						position: 'absolute',
						right: 73,
						bottom: 48,
						display: 'flex',
						alignItems: 'center',
						gap: 13,
						padding: '13px 17px',
						borderRadius: 14,
						backgroundColor: 'rgba(21,32,43,0.82)',
						border: '1px solid rgba(231,233,234,0.13)',
						boxShadow: '0 12px 32px rgba(0,0,0,0.28)',
						opacity: interpolate(frame, [55, 67], [0, 1], clamp),
						transform: `translateX(${interpolate(
							spring({
								frame: frame - 55,
								fps,
								config: {damping: 14, stiffness: 120},
							}),
							[0, 1],
							[45, 0],
						)}px)`,
					}}
				>
					<div>
						<div
							style={{
								color: PALETTE.muted,
								fontSize: 11,
								fontWeight: 800,
								letterSpacing: 1.5,
							}}
						>
							POST-MORTEM SIGNAL
						</div>
						<div
							style={{
								color: PALETTE.text,
								fontSize: 16,
								fontWeight: 800,
								marginTop: 3,
							}}
						>
							Clarity drove the cascade
						</div>
					</div>
					<div
						style={{
							width: 38,
							height: 38,
							borderRadius: 12,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'rgba(29,155,240,0.15)',
						}}
					>
						<Icon name="arrow" color={PALETTE.blue} size={21} />
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}