import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, SCENE_DURATION } from '../constants';
import { fadeInOut, parallaxY } from '../utils';

interface Props {
  scrollProgress: number;
}

const FLASH_LABELS = ['ROI', 'Expertise', 'Conformité', 'Engagement'];

function FlashThumbnail({
  label,
  index,
  frame,
  fps,
}: {
  label: string;
  index: number;
  frame: number;
  fps: number;
}) {
  const delay = index * 5 + 5;
  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.5 },
  });

  // Converge to center
  const convergeStart = 45;
  const positions = [
    { x: -120, y: -80 },
    { x: 120, y: -80 },
    { x: -120, y: 80 },
    { x: 120, y: 80 },
  ];
  const pos = positions[index];

  const moveX = interpolate(frame, [convergeStart, convergeStart + 20], [pos.x, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const moveY = interpolate(frame, [convergeStart, convergeStart + 20], [pos.y, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const thumbScale = interpolate(frame, [convergeStart, convergeStart + 20], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${moveX}px, ${moveY}px) scale(${appear * thumbScale})`,
        width: 90,
        height: 65,
        borderRadius: 8,
        background: COLORS.bgSubtle,
        border: `1px solid ${COLORS.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        color: COLORS.textMuted,
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {label}
    </div>
  );
}

function ParticleBurst({ frame }: { frame: number }) {
  const burstStart = 65;
  if (frame < burstStart) return null;

  const burstFrame = frame - burstStart;
  const particleCount = 12;

  return (
    <>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = interpolate(burstFrame, [0, 25], [0, 150], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const particleOpacity = interpolate(burstFrame, [0, 10, 25], [0, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: i % 3 === 0 ? COLORS.accent : COLORS.accentLight,
              transform: `translate(${x}px, ${y}px)`,
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </>
  );
}

export function VisionScene({ scrollProgress }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeInOut(frame, SCENE_DURATION, 15, 20);
  const pY = parallaxY(scrollProgress, 15);

  // Main text reveal
  const textDelay = 60;
  const textScale = spring({
    frame: frame - textDelay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 1 },
  });
  const textOpacity = interpolate(frame, [textDelay, textDelay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtitle
  const subDelay = 78;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        overflow: 'hidden',
      }}
    >
      {/* Flash thumbnails */}
      <div style={{ position: 'relative', width: 300, height: 200 }}>
        {FLASH_LABELS.map((label, i) => (
          <FlashThumbnail
            key={label}
            label={label}
            index={i}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Particle burst */}
      <div style={{ position: 'relative' }}>
        <ParticleBurst frame={frame} />
      </div>

      {/* Main text */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            fontFamily: 'Playfair Display, serif',
            color: COLORS.text,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Actifs numériques
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            fontFamily: 'Playfair Display, serif',
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          pérennes
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 20,
            fontSize: 14,
            color: COLORS.textMuted,
            opacity: subOpacity,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}
        >
          Au service de votre ambition
        </div>

        {/* Decorative line */}
        <div
          style={{
            marginTop: 20,
            width: interpolate(frame, [subDelay + 5, subDelay + 20], [0, 80], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            height: 2,
            background: COLORS.accent,
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
