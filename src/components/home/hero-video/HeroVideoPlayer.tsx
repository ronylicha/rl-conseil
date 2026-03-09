"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { HeroComposition, type HeroCompositionProps } from './HeroComposition';
import { FPS, TOTAL_FRAMES, COMPOSITION_WIDTH, COMPOSITION_HEIGHT } from './constants';

export function HeroVideoPlayer() {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll position for parallax effects
  const handleScroll = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    // 0 at top, 1 when scrolled one full viewport height
    const progress = Math.min(1, Math.max(0, scrollY / viewportHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection observer for play/pause when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Play/pause based on visibility
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isVisible) {
      player.play();
    } else {
      player.pause();
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 0 60px rgba(190, 60, 90, 0.08)',
      }}
    >
      <Player
        ref={playerRef}
        component={HeroComposition}
        inputProps={{ scrollProgress } satisfies HeroCompositionProps}
        durationInFrames={TOTAL_FRAMES}
        compositionWidth={COMPOSITION_WIDTH}
        compositionHeight={COMPOSITION_HEIGHT}
        fps={FPS}
        loop
        autoPlay
        style={{
          width: '100%',
          aspectRatio: `${COMPOSITION_WIDTH} / ${COMPOSITION_HEIGHT}`,
        }}
        controls={false}
      />
    </div>
  );
}
