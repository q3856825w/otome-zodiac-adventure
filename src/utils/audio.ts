export type AudioDebugState = {
  musicReady: boolean;
  musicPlaying: boolean;
  audioUnlocked: boolean;
  lastAudioError: string;
};

const AUDIO_PREF_KEY = "zodiac-boyfriend-music-enabled";
const DEFAULT_VOLUME = 0.25;
const BPM = 72;
const beat = 60 / BPM;

let audioContext: AudioContext | null = null;
let bgmTimer: number | null = null;
let masterGain: GainNode | null = null;
let shimmerGain: GainNode | null = null;
let step = 0;

const debugState: AudioDebugState = {
  musicReady: false,
  musicPlaying: false,
  audioUnlocked: false,
  lastAudioError: "",
};

const listeners = new Set<(state: AudioDebugState) => void>();

const dreamyProgression = [
  {
    root: 261.63,
    pad: [261.63, 329.63, 392.0],
    piano: [523.25, 659.25, 783.99, 659.25],
    musicBox: [1046.5, 1174.66, 1318.51, 1567.98],
    bells: [2093.0, 2637.02],
  },
  {
    root: 196.0,
    pad: [196.0, 246.94, 392.0],
    piano: [392.0, 493.88, 587.33, 783.99],
    musicBox: [987.77, 1174.66, 1479.98, 1567.98],
    bells: [1975.53, 2349.32],
  },
  {
    root: 220.0,
    pad: [220.0, 261.63, 329.63],
    piano: [440.0, 523.25, 659.25, 880.0],
    musicBox: [880.0, 1046.5, 1318.51, 1760.0],
    bells: [1760.0, 2637.02],
  },
  {
    root: 174.61,
    pad: [174.61, 261.63, 349.23],
    piano: [349.23, 440.0, 523.25, 698.46],
    musicBox: [698.46, 880.0, 1046.5, 1396.91],
    bells: [1567.98, 2093.0],
  },
];

const cloneDebug = () => ({ ...debugState });

const publish = () => {
  const next = cloneDebug();
  listeners.forEach((listener) => listener(next));
};

const setDebug = (patch: Partial<AudioDebugState>) => {
  Object.assign(debugState, patch);
  publish();
};

const getContext = () => {
  const AudioCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) {
    throw new Error("This browser does not support Web Audio API.");
  }
  if (!audioContext) {
    audioContext = new AudioCtor();
    setDebug({ musicReady: true });
  }
  return audioContext;
};

const getStoredPreference = () => localStorage.getItem(AUDIO_PREF_KEY);

export const getAudioDebugState = () => cloneDebug();

export const isMusicPreferenceOn = () => getStoredPreference() === "true";

export const shouldAutoStartMusic = () => getStoredPreference() !== "false";

export const subscribeAudioDebug = (listener: (state: AudioDebugState) => void) => {
  listeners.add(listener);
  listener(cloneDebug());
  return () => listeners.delete(listener);
};

const rememberMusic = (enabled: boolean) => {
  localStorage.setItem(AUDIO_PREF_KEY, String(enabled));
};

const connectSoftEcho = (context: AudioContext, input: AudioNode, output: AudioNode) => {
  const delay = context.createDelay();
  const feedback = context.createGain();
  const wet = context.createGain();

  delay.delayTime.value = beat * 1.25;
  feedback.gain.value = 0.12;
  wet.gain.value = 0.15;

  input.connect(output);
  input.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(output);
};

const playNote = (
  frequency: number,
  start: number,
  duration: number,
  gainValue: number,
  type: OscillatorType,
  destination: AudioNode,
  detune = 0
) => {
  const context = getContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.detune.setValueAtTime(detune, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  connectSoftEcho(context, gain, destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
};

const unlockAudio = async () => {
  const context = getContext();
  if (context.state !== "running") {
    await context.resume();
  }

  const tick = context.createOscillator();
  const tickGain = context.createGain();
  tick.type = "sine";
  tick.frequency.value = 880;
  tickGain.gain.setValueAtTime(0.0001, context.currentTime);
  tickGain.gain.linearRampToValueAtTime(0.012, context.currentTime + 0.01);
  tickGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.06);
  tick.connect(tickGain);
  tickGain.connect(context.destination);
  tick.start();
  tick.stop(context.currentTime + 0.07);

  setDebug({ audioUnlocked: true, lastAudioError: "" });
  return context;
};

const scheduleDreamMeasure = () => {
  const context = getContext();
  const mainOutput = masterGain;
  const shimmerOutput = shimmerGain;
  if (!mainOutput || !shimmerOutput || !debugState.musicPlaying) return;

  const now = context.currentTime + 0.05;
  const chord = dreamyProgression[step % dreamyProgression.length];

  playNote(chord.root / 2, now, beat * 3.95, 0.04, "triangle", mainOutput, -9);

  chord.pad.forEach((frequency, index) => {
    playNote(
      frequency,
      now + index * 0.035,
      beat * 3.8,
      index === 0 ? 0.048 : 0.028,
      "sine",
      mainOutput,
      index * 3 - 4,
    );
  });

  chord.piano.forEach((frequency, index) => {
    const start = now + index * beat;
    playNote(frequency, start, beat * 0.95, 0.07, "triangle", mainOutput, index % 2 === 0 ? -2 : 2);
    playNote(frequency * 2, start + beat * 0.34, beat * 0.62, 0.032, "sine", shimmerOutput, 6);
  });

  const musicBoxOrder = [0, 2, 1, 3];
  musicBoxOrder.forEach((noteIndex, index) => {
    playNote(
      chord.musicBox[noteIndex],
      now + beat * (0.25 + index * 0.5),
      beat * 0.5,
      0.038,
      "sine",
      shimmerOutput,
      index * 4,
    );
  });

  if (step % 2 === 0) {
    chord.bells.forEach((frequency, index) => {
      playNote(
        frequency,
        now + beat * (2.45 + index * 0.34),
        beat * 1.1,
        index === 0 ? 0.026 : 0.018,
        "triangle",
        shimmerOutput,
        8 + index * 5,
      );
    });
  }

  step = (step + 1) % dreamyProgression.length;
};

export const startBgm = async () => {
  try {
    rememberMusic(true);
    const context = await unlockAudio();
    if (bgmTimer && masterGain) {
      setDebug({ musicPlaying: true, lastAudioError: "" });
      return true;
    }

    step = 0;
    masterGain = context.createGain();
    shimmerGain = context.createGain();
    masterGain.gain.setValueAtTime(0.0001, context.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(DEFAULT_VOLUME, context.currentTime + 0.65);
    shimmerGain.gain.value = 0.32;
    masterGain.connect(context.destination);
    shimmerGain.connect(masterGain);

    setDebug({ musicReady: true, musicPlaying: true, audioUnlocked: true, lastAudioError: "" });
    scheduleDreamMeasure();
    bgmTimer = window.setInterval(scheduleDreamMeasure, beat * 4000);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setDebug({ musicPlaying: false, lastAudioError: message || "Audio play failed" });
    return false;
  }
};

export const stopBgm = (remember = true) => {
  if (remember) rememberMusic(false);
  if (bgmTimer) {
    window.clearInterval(bgmTimer);
    bgmTimer = null;
  }

  if (masterGain && audioContext) {
    const gainToDisconnect = masterGain;
    const shimmerToDisconnect = shimmerGain;
    const now = audioContext.currentTime;
    gainToDisconnect.gain.cancelScheduledValues(now);
    gainToDisconnect.gain.setValueAtTime(Math.max(gainToDisconnect.gain.value, 0.0001), now);
    gainToDisconnect.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    window.setTimeout(() => {
      gainToDisconnect.disconnect();
      shimmerToDisconnect?.disconnect();
    }, 430);
  }

  masterGain = null;
  shimmerGain = null;
  setDebug({ musicPlaying: false });
};

export const resumeStoredMusic = async () => {
  if (!isMusicPreferenceOn()) return false;
  return startBgm();
};

export const playChoiceSound = async () => {
  try {
    const context = await unlockAudio();
    const now = context.currentTime;
    playNote(783.99, now, 0.12, 0.08, "sine", context.destination);
    playNote(1174.66, now + 0.055, 0.17, 0.05, "triangle", context.destination);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setDebug({ lastAudioError: message || "Choice sound failed" });
    return false;
  }
};

export const playRevealSound = async () => {
  try {
    const context = await unlockAudio();
    const now = context.currentTime;
    const output = context.createGain();

    output.gain.setValueAtTime(0.0001, now);
    output.gain.exponentialRampToValueAtTime(0.22, now + 0.05);
    output.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
    output.connect(context.destination);

    const notes = [659.25, 987.77, 1318.51, 1760, 2349.32];
    notes.forEach((frequency, index) => {
      const start = now + index * 0.075;
      playNote(
        frequency,
        start,
        0.55,
        Math.max(0.035, 0.075 - index * 0.008),
        index % 2 === 0 ? "sine" : "triangle",
        output,
        index * 5,
      );
      playNote(frequency * 1.005, start + 0.018, 0.38, 0.03, "sine", output, -index * 4);
    });

    for (let i = 0; i < 10; i += 1) {
      const sparkle = context.createOscillator();
      const sparkleGain = context.createGain();
      const start = now + 0.18 + i * 0.045;

      sparkle.type = "sine";
      sparkle.frequency.setValueAtTime(1400 + i * 145, start);
      sparkle.frequency.exponentialRampToValueAtTime(2200 + i * 180, start + 0.12);
      sparkleGain.gain.setValueAtTime(0.0001, start);
      sparkleGain.gain.exponentialRampToValueAtTime(0.025, start + 0.015);
      sparkleGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
      sparkle.connect(sparkleGain);
      sparkleGain.connect(output);
      sparkle.start(start);
      sparkle.stop(start + 0.2);
    }

    window.setTimeout(() => output.disconnect(), 1300);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setDebug({ lastAudioError: message || "Reveal sound failed" });
    return false;
  }
};
