// Zero-dependency Web Audio API synthesizer for retro-futurist sound effects

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    // @ts-expect-error - supports webkitAudioContext fallback in Safari
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMute(muted?: boolean): boolean {
  if (muted !== undefined) {
    isMuted = muted;
  } else {
    isMuted = !isMuted;
  }
  return isMuted;
}

export function getMuted(): boolean {
  return isMuted;
}

// 1. Terminal keyboard typing click sound
export function playKeyboardClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

// 2. Navigation click/tick sound
export function playTick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.02, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

// 3. Selection chime/double-beep
export function playSelect() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Note 1
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(1000, now);
  gain1.gain.setValueAtTime(0.02, now);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.1);

  // Note 2 (slightly delayed and higher pitch)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(1300, now + 0.07);
  gain2.gain.setValueAtTime(0.02, now + 0.07);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.07);
  osc2.stop(now + 0.2);
}

// 4. Warp / screen dismissal transition sweep
export function playWarp() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.6;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, now);
  // Frequency sweeps upward rapidly
  osc.frequency.exponentialRampToValueAtTime(2000, now + duration);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  // Create a filter to make it sound more analog/sci-fi
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1000, now);
  filter.frequency.exponentialRampToValueAtTime(5000, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}
