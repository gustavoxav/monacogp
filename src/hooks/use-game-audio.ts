"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Howl } from "howler";

type AudioTrack = "gameplay" | "pause" | "gameOver";

export function useGameAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const gameplayTracksRef = useRef<Howl[]>([]);
  const pauseMusicRef = useRef<Howl | null>(null);
  const gameOverMusicRef = useRef<Howl | null>(null);
  const gameOverEffectRef = useRef<Howl | null>(null);
  const buttonSoundRef = useRef<Howl | null>(null);
  const currentGameplayTrackRef = useRef<Howl | null>(null);
  const currentTrackRef = useRef<AudioTrack | null>(null);

  useEffect(() => {
    gameplayTracksRef.current = [
      new Howl({
        src: ["/audio/track1.wav"],
        loop: true,
        volume: 0.6,
      }),
      new Howl({
        src: ["/audio/track2.wav"],
        loop: true,
        volume: 0.6,
      }),
      new Howl({
        src: ["/audio/track3.mp3"],
        loop: true,
        volume: 0.6,
      }),
      new Howl({
        src: ["/audio/stop-music.wav"],
        loop: true,
        volume: 0.5,
      }),
    ];

    pauseMusicRef.current = new Howl({
      src: ["/audio/stop-music.wav"],
      loop: true,
      volume: 0.5,
    });

    gameOverMusicRef.current = new Howl({
      src: ["/audio/game-over.wav"],
      loop: true,
      volume: 0.3,
    });

    gameOverEffectRef.current = new Howl({
      src: ["/audio/game-over-effect.wav"],
      loop: false,
      volume: 0.2,
    });

    buttonSoundRef.current = new Howl({
      src: ["/audio/button-click.wav"],
      loop: false,
      volume: 0.4,
    });

    return () => {
      gameplayTracksRef.current.forEach((track) => track.unload());
      pauseMusicRef.current?.unload();
      gameOverMusicRef.current?.unload();
      gameOverEffectRef.current?.unload();
      buttonSoundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    gameplayTracksRef.current.forEach((track) => track.mute(isMuted));
    pauseMusicRef.current?.mute(isMuted);
    gameOverMusicRef.current?.mute(isMuted);
    gameOverEffectRef.current?.mute(isMuted);
    buttonSoundRef.current?.mute(isMuted);
  }, [isMuted]);

  const stopAll = useCallback(() => {
    gameplayTracksRef.current.forEach((track) => track.stop());
    pauseMusicRef.current?.stop();
    gameOverMusicRef.current?.stop();
    gameOverEffectRef.current?.stop();
    currentGameplayTrackRef.current = null;
    currentTrackRef.current = null;
  }, []);

  const playTrack = useCallback(
    (track: AudioTrack) => {
      if (currentTrackRef.current === track) return;

      stopAll();
      currentTrackRef.current = track;

      if (track === "gameplay") {
        const randomIndex = Math.floor(Math.random() * 3);
        const selectedTrack = gameplayTracksRef.current[randomIndex];
        selectedTrack.play();
        currentGameplayTrackRef.current = selectedTrack;
      } else if (track === "pause") {
        pauseMusicRef.current?.play();
      }
    },
    [stopAll]
  );

  const playGameOverSequence = useCallback(() => {
    stopAll();
    currentTrackRef.current = "gameOver";
    gameOverEffectRef.current?.play();
    gameOverEffectRef.current?.once("end", () => {
      gameOverMusicRef.current?.play();
    });
  }, [stopAll]);

  const playButtonSound = useCallback(() => {
    if (!isMuted) {
      buttonSoundRef.current?.play();
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    playTrack,
    playGameOverSequence,
    playButtonSound,
    stopAll,
    toggleMute,
    isMuted,
  };
}
