"use client";

import { MonacoGPGame } from "@/components/monaco-gp-game";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a1f] via-[#1a0a2e] to-[#0a0a1f] py-8 px-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] via-[#ffbe0b] to-[#00f5ff] animate-pulse">
            MONACO GP
          </h1>
          <p className="text-[#00f5ff] text-xl font-mono tracking-wider">
            {"> RETRO RACING EDITION <"}
          </p>
        </div>

        <MonacoGPGame />

        <div className="mt-8 text-center space-y-4">
          <div className="inline-flex gap-6 flex-wrap items-center justify-center bg-black/40 backdrop-blur-sm px-8 py-4 rounded-xl border-2 border-[#ff006e]/30">
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-2 bg-[#ff006e]/20 border-2 border-[#ff006e] rounded text-[#ff006e] font-bold">
                ←
              </kbd>
              <kbd className="px-3 py-2 bg-[#ff006e]/20 border-2 border-[#ff006e] rounded text-[#ff006e] font-bold">
                →
              </kbd>
              <span className="text-white/80 font-mono">Direção</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-2 bg-[#ffbe0b]/20 border-2 border-[#ffbe0b] rounded text-[#ffbe0b] font-bold">
                R
              </kbd>
              <span className="text-white/80 font-mono">Reiniciar</span>
            </div>
          </div>

          <p className="text-white/50 font-mono text-sm">
            Desvie dos carros e alcance a maior distância possível!
          </p>
        </div>
      </div>
    </div>
  );
}
