export const FPS = 30;
export const DURATION_IN_SECONDS = 20;
export const TOTAL_FRAMES = FPS * DURATION_IN_SECONDS;
export const SCENE_DURATION = 4 * FPS; // 120 frames per scene

export const SCENES = {
  roi: { start: 0, duration: SCENE_DURATION },
  expertise: { start: SCENE_DURATION, duration: SCENE_DURATION },
  compliance: { start: SCENE_DURATION * 2, duration: SCENE_DURATION },
  engagement: { start: SCENE_DURATION * 3, duration: SCENE_DURATION },
  vision: { start: SCENE_DURATION * 4, duration: SCENE_DURATION },
} as const;

export const COLORS = {
  bg: '#0d1117',
  bgSubtle: '#161b22',
  surface: '#1c2128',
  text: '#f0ece4',
  textMuted: '#8b949e',
  accent: '#be3c5a',
  accentLight: '#d4546a',
  accentDark: '#9a2e47',
  success: '#10b981',
  border: '#30363d',
} as const;

export const COMPOSITION_WIDTH = 800;
export const COMPOSITION_HEIGHT = 600;
