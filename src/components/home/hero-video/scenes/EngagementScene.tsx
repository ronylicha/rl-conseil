import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, SCENE_DURATION } from '../constants';
import { fadeInOut, parallaxY } from '../utils';

interface Props {
  scrollProgress: number;
}

const WORDS = [
  { text: 'Un', delay: 8 },
  { text: 'interlocuteur', delay: 18 },
  { text: 'senior.', delay: 35 },
  { text: 'Point final.', delay: 55, accent: true },
];

function KineticWord({
  text,
  delay,
  accent,
  frame,
  fps,
}: {
  text: string;
  delay: number;
  accent?: boolean;
  frame: number;
  fps: number;
}) {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  const blur = interpolate(frame, [delay, delay + 8], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize: accent ? 52 : 48,
        fontWeight: 700,
        fontFamily: 'Playfair Display, serif',
        color: accent ? COLORS.accent : COLORS.text,
        lineHeight: 1.2,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
        opacity,
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
}

function PulsingDot({ frame }: { frame: number }) {
  const dotOpacity = interpolate(frame, [50, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulseScale = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.5, 1],
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: dotOpacity,
        marginTop: 32,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 12,
          height: 12,
        }}
      >
        {/* Pulse ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: COLORS.success,
            opacity: 0.3,
            transform: `scale(${pulseScale})`,
          }}
        />
        {/* Core dot */}
        <div
          style={{
            position: 'absolute',
            inset: 2,
            borderRadius: '50%',
            background: COLORS.success,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 13,
          color: COLORS.textMuted,
          fontFamily: 'DM Sans, sans-serif',
          letterSpacing: '0.05em',
        }}
      >
        Disponible · Stable · Engagé
      </span>
    </div>
  );
}

export function EngagementScene({ scrollProgress }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeInOut(frame, SCENE_DURATION);
  const pY = parallaxY(scrollProgress, 15);

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
      }}
    >
      {/* Scene label */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: COLORS.accent,
          marginBottom: 40,
          fontFamily: 'DM Sans, sans-serif',
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Engagement
      </div>

      {/* Kinetic text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        {WORDS.map((word) => (
          <KineticWord
            key={word.text}
            text={word.text}
            delay={word.delay}
            accent={word.accent}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Status indicator */}
      <PulsingDot frame={frame} />

      {/* Decorative line */}
      <div
        style={{
          marginTop: 32,
          width: interpolate(frame, [70, 95], [0, 200], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
        }}
      />
    </div>
  );
}
