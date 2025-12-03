"use client";

import { Volume2, VolumeX } from "lucide-react";

interface SoundToggleButtonProps {
  isMuted: boolean;
  onToggle: () => void;
  onPlayButtonSound: () => void;
}

export function SoundToggleButton({
  isMuted,
  onToggle,
  onPlayButtonSound,
}: Readonly<SoundToggleButtonProps>) {
  const handleClick = () => {
    if (!isMuted) {
      onPlayButtonSound();
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#8338ec] to-[#3a86ff] shadow-lg shadow-[#8338ec]/50 flex items-center justify-center hover:scale-110 transition-transform group"
      aria-label={isMuted ? "Ativar som" : "Desativar som"}>
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-white" />
      ) : (
        <Volume2 className="w-6 h-6 text-white animate-pulse" />
      )}
      <div className="absolute -top-10 right-0 bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isMuted ? "Ativar som" : "Desativar som"}
      </div>
    </button>
  );
}
