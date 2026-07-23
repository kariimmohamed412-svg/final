// Web Audio API Sound Generator Utility (Zero-Dependency + Throttled for 60+ FPS performance)

let audioCtx: AudioContext | null = null;
let lastHoverTime = 0;
let lastClickTime = 0;

export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('soundEnabled') === 'true';
};

export const setSoundEnabled = (enabled: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('soundEnabled', enabled ? 'true' : 'false');
};

export const toggleSound = (): boolean => {
  const nextState = !isSoundEnabled();
  setSoundEnabled(nextState);
  if (nextState) {
    getAudioContext(); // Initialize / resume audio context on gesture
  }
  return nextState;
};

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Gentle 800Hz sine-wave pop sound for button clicks (Throttled to max 1 sound per 60ms)
export const playClickSound = () => {
  if (!isSoundEnabled()) return;
  const now = performance.now();
  if (now - lastClickTime < 60) return;
  lastClickTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Fail silently
  }
};

// Subtle frequency pitch chirp for card hovers (Throttled to max 1 sound per 50ms for smooth 60fps card sweeps)
export const playHoverSound = () => {
  if (!isSoundEnabled()) return;
  const now = performance.now();
  if (now - lastHoverTime < 50) return;
  lastHoverTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Fail silently
  }
};

// High-fidelity chime for successful events
export const playSuccessSound = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === 'suspended') return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.06);
    osc.frequency.setValueAtTime(783.99, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Fail silently
  }
};
