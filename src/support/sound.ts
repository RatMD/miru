type WaveType = OscillatorType;

interface PlayNoteOptions {
    freq: number;
    duration?: number;
    type?: WaveType;
    gain?: number;
    detuneCents?: number;
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
    lowpassHz?: number;
    pitchGlide?: number;
}

let audioCtx: AudioContext | null = null;

/**
 * Create or reuse the shared browser audio context.
 * @returns The shared AudioContext.
 */
function getAudioCtx(): AudioContext {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return audioCtx;
}

/**
 * Initialize audio and resume a suspended context.
 * @returns A promise that resolves when the audio context is ready.
 */
async function prepare(): Promise<void> {
    const ctx = getAudioCtx();

    if (ctx.state === 'suspended') {
        await ctx.resume();
    }
}

/**
 * Schedule an oscillator note with an amplitude envelope and low-pass filter.
 * @param options Frequency, waveform, duration, gain and envelope settings.
 * @returns Nothing; playback is scheduled on the audio context.
 */
function playNote({
    freq,
    duration = 0.15,
    type = 'sine',
    gain = 0.1,
    attack = 0.003,
    decay = 0.05,
    sustain = 0.5,
    release = 0.05,
    lowpassHz = 9000,
    pitchGlide = 0,
}: PlayNoteOptions): void {
    const ctx = getAudioCtx();
    const t0 = ctx.currentTime;

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const lp = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);

    if (pitchGlide !== 0) {
        osc.frequency.linearRampToValueAtTime(freq * Math.pow(2, pitchGlide / 1200), t0 + duration);
    }

    // Envelope (knackig, keine langen Fades)
    const sLevel = gain * sustain;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + attack);
    g.gain.linearRampToValueAtTime(sLevel, t0 + attack + decay);
    g.gain.setValueAtTime(sLevel, t0 + duration);
    g.gain.linearRampToValueAtTime(0.0001, t0 + duration + release);

    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(lowpassHz, t0);

    osc.connect(g);
    g.connect(lp);
    lp.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + duration + release + 0.01);
}

/**
 * Wait between scheduled notification notes.
 * @param ms Delay in milliseconds.
 * @returns A promise that resolves after the delay.
 */
function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

/**
 * Play the two-note success notification.
 * @returns A promise that resolves after scheduling both notes.
 */
async function playSuccess(): Promise<void> {
    await prepare();
    playNote({
        freq: 600,
        duration: 0.15,
        gain: 1,
        pitchGlide: +20,
        type: 'square',
        lowpassHz: 6000,
    });
    await sleep(100);
    playNote({
        freq: 650,
        duration: 0.15,
        gain: 1,
        pitchGlide: +20,
        type: 'square',
        lowpassHz: 6000,
    });
}

/**
 * Play the error notification tone.
 * @returns A promise that resolves after scheduling the tone.
 */
async function playError(): Promise<void> {
    await prepare();
    playNote({
        freq: 650,
        duration: 0.65,
        gain: 1,
        pitchGlide: -10,
        type: 'square',
        lowpassHz: 1250,
        sustain: 1,
        attack: 0.125,
    });
}

// Export module
export { prepare, playSuccess, playError };
