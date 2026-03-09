import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SCENE_DURATION, TOTAL_FRAMES } from './constants';
import { RoiScene } from './scenes/RoiScene';
import { ExpertiseScene } from './scenes/ExpertiseScene';
import { ComplianceScene } from './scenes/ComplianceScene';
import { EngagementScene } from './scenes/EngagementScene';
import { VisionScene } from './scenes/VisionScene';

export interface HeroCompositionProps {
  scrollProgress: number;
}

function SubtleGrid() {
  const frame = useCurrentFrame();
  const gridOpacity = interpolate(frame % TOTAL_FRAMES, [0, 30], [0.03, 0.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, opacity: gridOpacity }}
    >
      <defs>
        <pattern id="hero-grid" width={40} height={40} patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={COLORS.textMuted}
            strokeWidth={0.5}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  );
}

function SceneIndicator() {
  const frame = useCurrentFrame();
  const sceneIndex = Math.floor(frame / SCENE_DURATION);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: sceneIndex === i ? 24 : 6,
            height: 6,
            borderRadius: 3,
            background: sceneIndex === i ? COLORS.accent : COLORS.border,
            transition: 'width 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

export function HeroComposition({ scrollProgress }: HeroCompositionProps) {
  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        overflow: 'hidden',
      }}
    >
      {/* Subtle background grid */}
      <SubtleGrid />

      {/* Corner accent glow */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accent}10, transparent)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Scene 1: ROI & Chiffres */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <AbsoluteFill>
          <RoiScene scrollProgress={scrollProgress} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Expertise Technique */}
      <Sequence from={SCENE_DURATION} durationInFrames={SCENE_DURATION}>
        <AbsoluteFill>
          <ExpertiseScene scrollProgress={scrollProgress} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Conformité Réglementaire */}
      <Sequence from={SCENE_DURATION * 2} durationInFrames={SCENE_DURATION}>
        <AbsoluteFill>
          <ComplianceScene scrollProgress={scrollProgress} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Engagement Senior */}
      <Sequence from={SCENE_DURATION * 3} durationInFrames={SCENE_DURATION}>
        <AbsoluteFill>
          <EngagementScene scrollProgress={scrollProgress} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Vision / Closer */}
      <Sequence from={SCENE_DURATION * 4} durationInFrames={SCENE_DURATION}>
        <AbsoluteFill>
          <VisionScene scrollProgress={scrollProgress} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene progress indicator */}
      <SceneIndicator />
    </AbsoluteFill>
  );
}
