import { interpolate } from 'remotion';

/**
 * Fade-in at the start and fade-out at the end of a scene.
 * Returns opacity 0→1 over fadeIn frames, holds 1, then 1→0 over fadeOut frames.
 */
export function fadeInOut(
  frame: number,
  totalFrames: number,
  fadeIn = 15,
  fadeOut = 15,
): number {
  return interpolate(
    frame,
    [0, fadeIn, totalFrames - fadeOut, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
}

/**
 * Parallax offset based on scroll progress.
 * Returns a Y translation value that shifts elements at different speeds.
 */
export function parallaxY(scrollProgress: number, intensity = 30): number {
  return -scrollProgress * intensity;
}

/**
 * Stagger delay for sequential element animations.
 * Returns the starting frame for element at given index.
 */
export function staggerDelay(index: number, delayPerItem = 6): number {
  return index * delayPerItem;
}

/**
 * Draw progress for SVG path animations (stroke-dasharray technique).
 * Returns a value between 0 and 1.
 */
export function drawProgress(
  frame: number,
  startFrame: number,
  duration: number,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}
