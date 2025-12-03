"use client";

import { PLAYER_CAR_COLORS } from "@/lib/game-constants";
import { ColorSelector } from "./color-selector";

interface PauseScreenProps {
  onResume: () => void;
  playerColor: string;
  handleColorSelect: (color: string) => void;
}

export const PauseScreen = ({
  onResume,
  playerColor,
  handleColorSelect,
}: PauseScreenProps) => {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
      <ColorSelector
        colors={PLAYER_CAR_COLORS}
        selectedColor={playerColor}
        onColorSelect={handleColorSelect}
      />
      <div className="text-center justify-center items-center space-y-6">
        <h2 className="text-6xl font-bold text-[#00f5ff] animate-pulse drop-shadow-[0_0_20px_rgba(0,245,255,0.8)]">
          PAUSADO
        </h2>
        <p className="text-xl text-[#ff006e]">
          Clique em continuar para
          <br />
          voltar às pistas
        </p>
        <button
          onClick={onResume}
          className="px-8 py-3 bg-gradient-to-r from-[#ff006e] to-[#fb5607] text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-[#ff006e]/50">
          Continuar
        </button>
      </div>
    </div>
  );
};
