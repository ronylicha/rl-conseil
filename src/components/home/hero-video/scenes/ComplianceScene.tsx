import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, SCENE_DURATION } from '../constants';
import { fadeInOut, parallaxY, staggerDelay } from '../utils';

interface Props {
  scrollProgress: number;
}

const BADGES = [
  { label: 'HDS', description: 'Hébergement Données de Santé', angle: -40 },
  { label: 'eIDAS', description: 'Signatures Électroniques', angle: 0 },
  { label: 'Factur-X', description: 'Facturation Électronique', angle: 40 },
];

function Shield({ frame, fps }: { frame: number; fps: number }) {
  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60, mass: 1.2 },
  });

  // Shield path (simplified)
  const shieldPath = 'M 0 -50 L 40 -35 L 40 10 Q 40 45 0 60 Q -40 45 -40 10 L -40 -35 Z';

  const checkProgress = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <g transform={`scale(${scale})`}>
      {/* Glow */}
      <circle r={70} fill={COLORS.accent} opacity={0.06} filter="blur(20px)" />

      {/* Shield */}
      <path
        d={shieldPath}
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth={2}
        opacity={0.95}
      />

      {/* Inner shield accent */}
      <path
        d="M 0 -38 L 30 -26 L 30 8 Q 30 35 0 47 Q -30 35 -30 8 L -30 -26 Z"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* Checkmark */}
      <path
        d="M -15 5 L -5 15 L 18 -10"
        fill="none"
        stroke={COLORS.success}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={60}
        strokeDashoffset={60 * (1 - checkProgress)}
      />
    </g>
  );
}

function Badge({
  label,
  description,
  index,
  frame,
  fps,
  centerX,
  centerY,
  angle,
}: {
  label: string;
  description: string;
  index: number;
  frame: number;
  fps: number;
  centerX: number;
  centerY: number;
  angle: number;
}) {
  const delay = staggerDelay(index, 12) + 30;
  const badgeScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  const rad = (angle * Math.PI) / 180;
  const orbitRadius = 140;
  const x = centerX + Math.sin(rad) * orbitRadius;
  const y = centerY - Math.cos(rad) * orbitRadius + 20;

  const checkDelay = delay + 15;
  const checkOpacity = interpolate(frame, [checkDelay, checkDelay + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <g transform={`translate(${x}, ${y}) scale(${badgeScale})`}>
      {/* Badge background */}
      <rect
        x={-55}
        y={-22}
        width={110}
        height={44}
        rx={8}
        fill={COLORS.bgSubtle}
        stroke={COLORS.border}
        strokeWidth={1}
      />
      {/* Label */}
      <text
        textAnchor="middle"
        dy="-0.2em"
        fill={COLORS.text}
        fontSize={14}
        fontWeight={700}
        fontFamily="DM Sans, sans-serif"
      >
        {label}
      </text>
      {/* Description */}
      <text
        textAnchor="middle"
        dy="1.2em"
        fill={COLORS.textMuted}
        fontSize={8}
        fontFamily="DM Sans, sans-serif"
      >
        {description}
      </text>
      {/* Checkmark indicator */}
      <circle cx={45} cy={-12} r={8} fill={COLORS.success} opacity={checkOpacity} />
      <text
        x={45}
        y={-12}
        textAnchor="middle"
        dy="0.35em"
        fill="white"
        fontSize={10}
        fontWeight={700}
        opacity={checkOpacity}
      >
        ✓
      </text>
    </g>
  );
}

function ScanLine({ frame }: { frame: number }) {
  const scanY = interpolate(frame, [20, 90], [-10, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < 20 || frame > 90) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: `${scanY}%`,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${COLORS.accent}40, ${COLORS.accent}80, ${COLORS.accent}40, transparent)`,
        filter: 'blur(1px)',
        pointerEvents: 'none',
      }}
    />
  );
}

export function ComplianceScene({ scrollProgress }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeInOut(frame, SCENE_DURATION);
  const pY = parallaxY(scrollProgress, 20);

  const centerX = 400;
  const centerY = 280;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${pY}px)`,
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <ScanLine frame={frame} />

      {/* Scene label */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: COLORS.accent,
          marginBottom: 24,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Conformité Réglementaire
      </div>

      {/* Shield + Badges SVG */}
      <svg width={800} height={400} viewBox="0 0 800 400" style={{ overflow: 'visible' }}>
        {/* Connection lines from shield to badges */}
        {BADGES.map((badge, i) => {
          const rad = (badge.angle * Math.PI) / 180;
          const bx = centerX + Math.sin(rad) * 140;
          const by = centerY - Math.cos(rad) * 140 + 20;
          const lineOpacity = interpolate(
            frame,
            [staggerDelay(i, 12) + 28, staggerDelay(i, 12) + 38],
            [0, 0.3],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );

          return (
            <line
              key={badge.label}
              x1={centerX}
              y1={centerY}
              x2={bx}
              y2={by}
              stroke={COLORS.accent}
              strokeWidth={1}
              strokeDasharray="3 3"
              opacity={lineOpacity}
            />
          );
        })}

        {/* Central shield */}
        <g transform={`translate(${centerX}, ${centerY})`}>
          <Shield frame={frame} fps={fps} />
        </g>

        {/* Badges */}
        {BADGES.map((badge, i) => (
          <Badge
            key={badge.label}
            label={badge.label}
            description={badge.description}
            index={i}
            frame={frame}
            fps={fps}
            centerX={centerX}
            centerY={centerY}
            angle={badge.angle}
          />
        ))}
      </svg>

      {/* Bottom text */}
      <div
        style={{
          marginTop: 8,
          fontSize: 15,
          color: COLORS.textMuted,
          fontStyle: 'italic',
          opacity: interpolate(frame, [70, 85], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Les contraintes sont mon terrain de jeu
      </div>
    </div>
  );
}
