import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, SCENE_DURATION } from '../constants';
import { fadeInOut, parallaxY, staggerDelay } from '../utils';

interface Props {
  scrollProgress: number;
}

const CODE_LINES = [
  { indent: 0, text: 'async function buildAsset() {', color: COLORS.accent },
  { indent: 1, text: 'const architecture = await design();', color: COLORS.text },
  { indent: 1, text: 'const tests = coverage(95);', color: COLORS.text },
  { indent: 1, text: 'const deploy = await ci.pipeline();', color: COLORS.text },
  { indent: 1, text: 'return asset.perenne();', color: COLORS.accentLight },
  { indent: 0, text: '}', color: COLORS.accent },
];

const HEX_NODES = [
  { x: 120, y: 80, label: 'API', delay: 0 },
  { x: 260, y: 50, label: 'DB', delay: 4 },
  { x: 400, y: 80, label: 'CI/CD', delay: 8 },
  { x: 190, y: 180, label: 'React', delay: 12 },
  { x: 330, y: 180, label: 'Tests', delay: 16 },
  { x: 260, y: 280, label: 'Deploy', delay: 20 },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 5], [4, 5], [3, 4],
];

function HexNode({
  x,
  y,
  label,
  frame,
  fps,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  frame: number;
  fps: number;
  delay: number;
}) {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  const r = 28;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Glow */}
      <circle r={r + 8} fill={COLORS.accent} opacity={0.08} filter="blur(8px)" />
      {/* Hex shape approximated as circle with border */}
      <circle
        r={r}
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth={1.5}
        opacity={0.9}
      />
      <text
        textAnchor="middle"
        dy="0.35em"
        fill={COLORS.text}
        fontSize={11}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={500}
      >
        {label}
      </text>
    </g>
  );
}

export function ExpertiseScene({ scrollProgress }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeInOut(frame, SCENE_DURATION);
  const pY = parallaxY(scrollProgress, 25);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        opacity,
        transform: `translateY(${pY}px)`,
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {/* Left: Network graph */}
      <div style={{ width: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={520} height={360} viewBox="0 0 520 360" style={{ overflow: 'visible' }}>
          {/* Connection lines */}
          {CONNECTIONS.map(([from, to], i) => {
            const a = HEX_NODES[from];
            const b = HEX_NODES[to];
            const lineDelay = Math.max(a.delay, b.delay) + 5;
            const lineOpacity = interpolate(
              frame,
              [lineDelay, lineDelay + 10],
              [0, 0.4],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );

            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={COLORS.accent}
                strokeWidth={1}
                opacity={lineOpacity}
                strokeDasharray="4 4"
              />
            );
          })}
          {/* Nodes */}
          {HEX_NODES.map((node) => (
            <HexNode
              key={node.label}
              x={node.x}
              y={node.y}
              label={node.label}
              frame={frame}
              fps={fps}
              delay={node.delay}
            />
          ))}
        </svg>
      </div>

      {/* Right: Terminal code */}
      <div
        style={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: 32,
        }}
      >
        {/* Scene label */}
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: COLORS.accent,
            marginBottom: 20,
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          Expertise Technique
        </div>

        {/* Code block */}
        <div
          style={{
            background: COLORS.bgSubtle,
            borderRadius: 12,
            padding: '20px 24px',
            border: `1px solid ${COLORS.border}`,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          {/* Terminal dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          </div>

          {CODE_LINES.map((line, i) => {
            const delay = staggerDelay(i, 10) + 15;
            const lineOpacity = interpolate(frame, [delay, delay + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const lineX = interpolate(frame, [delay, delay + 8], [10, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  opacity: lineOpacity,
                  transform: `translateX(${lineX}px)`,
                  color: line.color,
                  paddingLeft: line.indent * 24,
                  whiteSpace: 'nowrap',
                }}
              >
                {line.text}
              </div>
            );
          })}

          {/* Blinking cursor */}
          <div
            style={{
              marginTop: 4,
              opacity: frame % 30 < 15 ? 1 : 0,
              color: COLORS.accent,
            }}
          >
            _
          </div>
        </div>

        {/* Stats line */}
        <div
          style={{
            marginTop: 16,
            fontSize: 12,
            color: COLORS.textMuted,
            opacity: interpolate(frame, [80, 95], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          15 ans d'erreurs que vous n'aurez pas à commettre
        </div>
      </div>
    </div>
  );
}
