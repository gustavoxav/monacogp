import { Button } from "@/components/ui/button";

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export function GameOverScreen({
  score,
  highScore,
  onRestart,
}: Readonly<GameOverScreenProps>) {
  const isNewRecord = score >= highScore && score > 0;

  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
      <div className="text-center space-y-6 p-8">
        <h2 className="text-6xl font-bold text-[#ff006e] animate-pulse">
          GAME OVER
        </h2>
        <div className="space-y-2">
          <p className="text-4xl font-bold text-[#00f5ff]">{score}m</p>
          {isNewRecord && (
            <p className="text-2xl text-[#ffbe0b] font-bold animate-pulse">
              NOVO RECORDE!
            </p>
          )}
        </div>
        <Button
          onClick={onRestart}
          className="bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white text-xl px-8 py-6 rounded-xl font-bold hover:scale-110 transition-transform shadow-lg shadow-[#ff006e]/50">
          JOGAR NOVAMENTE
        </Button>
        <p className="text-white/60 text-sm font-mono">ou pressione R</p>
      </div>
    </div>
  );
}
