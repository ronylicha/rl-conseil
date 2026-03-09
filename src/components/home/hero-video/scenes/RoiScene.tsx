import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, SCENE_DURATION } from '../constants';
import { fadeInOut, staggerDelay, parallaxY, drawProgress } from '../utils';

interface Props {
  scrollProgress: number;
}

const METRICS = [
  { value: 15, suffix: '+', label: 'ans d\'expertise', unit: '' },
  { value: 50, suffix: '+', label: 'apps en production', unit: '' },
  { value: 99.9, suffix: '%', label: 'disponibilité', unit: '' },
  { value: 500, suffix: 'k€+', label: 'traités', unit: '' },
];

function AnimatedCounter({
  target,
  suffix,
  frame,
  fps,
  delay,
}: {
  target: number;
  suffix: string;
  frame: number;
  fps: number;
  delay: number;
}) {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 30, stiffness: 80, mass: 1 },
  });
  const displayValue = target % 1 === 0
    ? Math.round(target * progress)
    : (target * progress).toFixed(1);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {displayValue}{suffix}
    </span>
  );
}

function MiniChart({ frame, fps }: { frame: number; fps: number }) {
  const points = [20, 45, 30, 60, 40, 75, 55, 85, 70, 95];
  const chartWidth = 280;
  const chartHeight = 60;
  const stepX = chartWidth / (points.length - 1);

  const pathD = points
    .map((y, i) => {
      const x = i * stepX;
      const scaledY = chartHeight - (y / 100) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${scaledY}`;
    })
    .join(' ');

  const progress = drawProgress(frame, 20, 60);
  const dashLength = 600;

  return (
    <svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
        <line
          key={ratio}
          x1={0}
          y1={chartHeight * ratio}
          x2={chartWidth}
          y2={chartHeight * ratio}
          stroke={COLORS.border}
          strokeWidth={0.5}
          opacity={interpolate(frame, [10, 25], [0, 0.5], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}
        />
      ))}
      {/* Chart line */}
      <path
        d={pathD}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashLength}
        strokeDashoffset={dashLength * (1 - progress)}
      />
      {/* Glow line */}
      <path
        d={pathD}
        fill="none"
        stroke={COLORS.accentLight}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashLength}
        strokeDashoffset={dashLength * (1 - progress)}
        opacity={0.3}
        filter="blur(4px)"
      />
      {/* End dot */}
      {progress > 0.95 && (
        <circle
          cx={chartWidth}
          cy={chartHeight - (points[points.length - 1] / 100) * chartHeight}
          r={4}
          fill={COLORS.accent}
          opacity={interpolate(frame, [78, 85], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}
        >
          <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

export function RoiScene({ scrollProgress }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeInOut(frame, SCENE_DURATION);
  const pY = parallaxY(scrollProgress, 20);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${pY}px)`,
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {/* Scene title */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: COLORS.accent,
          marginBottom: 32,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        ROI-First
      </div>

      {/* Metrics grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px 48px',
          marginBottom: 36,
        }}
      >
        {METRICS.map((metric, i) => {
          const delay = staggerDelay(i, 8);
          const itemOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const itemY = interpolate(frame, [delay, delay + 12], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={metric.label}
              style={{
                textAlign: 'center',
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: COLORS.text,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  frame={frame}
                  fps={fps}
                  delay={delay}
                />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  letterSpacing: '0.05em',
                }}
              >
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini chart */}
      <div
        style={{
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <MiniChart frame={frame} fps={fps} />
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 28,
          fontSize: 15,
          color: COLORS.textMuted,
          fontStyle: 'italic',
          opacity: interpolate(frame, [50, 65], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Nous parlons ROI, pas lignes de code
      </div>
    </div>
  );
}
