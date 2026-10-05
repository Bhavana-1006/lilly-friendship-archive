/**
 * Subtle organic sound effects synthesized with Web Audio API.
 * Guaranteed to work without missing audio files or network delays.
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = false;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  toggleSound() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playChime();
    }
    return this.soundEnabled;
  }

  // Soft pencil stroke / paper rustle sound
  playPencilStroke() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const bufferSize = this.audioCtx.sampleRate * 0.12;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start();
    } catch {
      // Ignore audio errors gracefully
    }
  }

  // Soft mechanical / subtle click
  playClick() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch {
      // Ignore audio errors gracefully
    }
  }

  // Success / unlock chime
  playUnlock() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.08);

        const startTime = this.audioCtx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Ignore audio errors gracefully
    }
  }

  // Gentle celebration chime chord
  playChime() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      [440, 554.37, 659.25].forEach((freq) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      });
    } catch {
      // Ignore audio errors gracefully
    }
  }
}

export const soundFx = new SoundController();
