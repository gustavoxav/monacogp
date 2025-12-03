export class ChiptuneAudioGenerator {
  private audioContext: AudioContext | null = null;
  private currentSource: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private currentTrack: "gameplay" | "pause" | "gameOver" | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.3;
    }
  }

  private playNote(frequency: number, duration: number, delay = 0) {
    if (!this.audioContext || !this.gainNode) return;

    const oscillator = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime + delay
    );

    noteGain.gain.setValueAtTime(0.3, this.audioContext.currentTime + delay);
    noteGain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + delay + duration
    );

    oscillator.connect(noteGain);
    noteGain.connect(this.gainNode);

    oscillator.start(this.audioContext.currentTime + delay);
    oscillator.stop(this.audioContext.currentTime + delay + duration);
  }

  private playGameplayMusic() {
    if (!this.audioContext) return;

    // Fast-paced racing melody
    const melody = [
      { freq: 523.25, duration: 0.15 }, // C5
      { freq: 587.33, duration: 0.15 }, // D5
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 783.99, duration: 0.15 }, // G5
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 587.33, duration: 0.15 }, // D5
      { freq: 523.25, duration: 0.3 }, // C5
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 783.99, duration: 0.3 }, // G5
    ];

    let currentTime = 0;
    melody.forEach((note) => {
      this.playNote(note.freq, note.duration, currentTime);
      currentTime += note.duration;
    });

    if (this.isPlaying && this.currentTrack === "gameplay") {
      setTimeout(() => this.playGameplayMusic(), currentTime * 1000);
    }
  }

  private playPauseMusic() {
    if (!this.audioContext) return;

    // Calm, ambient melody
    const melody = [
      { freq: 392.0, duration: 0.4 }, // G4
      { freq: 440.0, duration: 0.4 }, // A4
      { freq: 493.88, duration: 0.4 }, // B4
      { freq: 523.25, duration: 0.8 }, // C5
      { freq: 493.88, duration: 0.4 }, // B4
      { freq: 440.0, duration: 0.4 }, // A4
      { freq: 392.0, duration: 0.8 }, // G4
    ];

    let currentTime = 0;
    melody.forEach((note) => {
      this.playNote(note.freq, note.duration, currentTime);
      currentTime += note.duration;
    });

    if (this.isPlaying && this.currentTrack === "pause") {
      setTimeout(() => this.playPauseMusic(), currentTime * 1000);
    }
  }

  private playGameOverMusic() {
    if (!this.audioContext) return;

    // Sad, descending melody
    const melody = [
      { freq: 523.25, duration: 0.3 }, // C5
      { freq: 493.88, duration: 0.3 }, // B4
      { freq: 440.0, duration: 0.3 }, // A4
      { freq: 392.0, duration: 0.3 }, // G4
      { freq: 349.23, duration: 0.3 }, // F4
      { freq: 329.63, duration: 0.3 }, // E4
      { freq: 293.66, duration: 0.6 }, // D4
      { freq: 261.63, duration: 1.2 }, // C4
    ];

    let currentTime = 0;
    melody.forEach((note) => {
      this.playNote(note.freq, note.duration, currentTime);
      currentTime += note.duration;
    });
  }

  playTrack(track: "gameplay" | "pause" | "gameOver") {
    this.stop();
    this.isPlaying = true;
    this.currentTrack = track;

    if (track === "gameplay") {
      this.playGameplayMusic();
    } else if (track === "pause") {
      this.playPauseMusic();
    } else if (track === "gameOver") {
      this.playGameOverMusic();
    }
  }

  stop() {
    this.isPlaying = false;
    this.currentTrack = null;
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  mute() {
    this.setVolume(0);
  }

  unmute() {
    this.setVolume(0.3);
  }
}
